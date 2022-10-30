import React from "react";
import {Row, Col, Pagination, Button, message, Badge, Carousel} from "antd"
import { SmileTwoTone } from '@ant-design/icons';
import ItemCard from "../components/itemCard";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import ad1 from "../assets/img/ad1.png";
import ad2 from "../assets/img/ad2.png";
import ad3 from "../assets/img/ad3.png";
import axios from "axios";


const ItemList = (props) => {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [page, setPage] = useState(0);

    //react-router-dom v6의 query string 가져오는 방법
    const [searchParams] = useSearchParams();
    const query = searchParams.get('searchWord');
    const searchWordQuery = {                      
        searchWord: query
    }


    useEffect(()=>{
        const listUpdate = async () => {
            try{
                let result;
                if(props.isMyList){
                    const r = await axios.get(`/rest/items/member/${props.login}`);
                    result = r.data.data.map(x=>x.Item);
                } else {
                    result = await axios.get("/rest/items", {params: searchWordQuery});
                    result = result.data.data;
                }
                if(result){
                    const rawData = result;
                    const displayData = rawData.map(el => ({
                        id: el.id,
                        title: el.title,
                        progress: `${el.member_limit}명 중 ${el.member_current}명 모집완료`,
                        infoLink: el.link,
                        img: el.img
                    }));
                    setItemList(displayData);
                }else{
                }
            } catch (err) {
                console.error(err);
            }
        } 
        listUpdate();
    },[props.login])
    
    return(
        <>
        <p style={{padding: "10px 220px", fontSize:"1.5rem"}}>{props.isMyList ? <>나의 공동구매</> : <><strong>{query=="market"?"공동구매":query}</strong> 검색결과</> }</p>
        <Row style={{margin:"0 200px"}}>
        {props.isMyList ? '' : 
            <Col span={6}>       
            <div style={{padding:"20px", width:"100%", height:"100%"}}>
                    <Badge.Ribbon text="ads">
                        { query=="로카티" ? <img src={ad1} style={{height:"100%", width:"100%"}} /> :
                            <Carousel autoplay={true}>
                                <div>
                                    <img src={ad1} style={{width:"100%", height:"100%"}} />
                                </div>
                                <div>
                                    <img src={ad2} style={{width:"100%", height:"100%"}} />
                                </div>
                                <div>
                                    <img src={ad3} style={{width:"100%", height:"100%"}} />
                                </div>
                            </Carousel>
                        }
                    </Badge.Ribbon>
            </div>      
        </Col>}
        {      
            itemList.slice(page*6, (page+1)*6).map( 
                (el,i) =>   <Col key={i} span={6}> 
                                <Link to={props.isMyList ? `/item-manage/${el.id}`:`/item/${el.id}`}><ItemCard data={el}></ItemCard></Link>
                            </Col>)
        }
        {props.isMyList ? '' : 
            <Col span={6}>       
            <div style={{padding:"20px", width:"100%", height:"100%"}}>
                <Link to="/item-create">
                    <Button style={{width:"100%", height:"100%", fontWeight:"100", fontSize:"2rem"}} type="dashed" block>
                        <div>
                            <SmileTwoTone style={{fontSize:"3rem"}}/>
                            <div
                                style={{
                                marginTop: 8,
                                }}
                            >
                                원하는 상품이 없다면 <br/>
                                직접 모집해보세요!
                            </div>
                        </div>
                    </Button>
                </Link>
            </div>      
        </Col>}
        </Row> 
        <Pagination size="small" defaultPageSize={6} total={itemList.length} onChange={(page, pageSize)=> {console.log(page);setPage(page-1);}} style={{textAlign:"center"}} />
        </>
    );
}


export default ItemList;