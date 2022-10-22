import React from "react";
import {Row, Col, Pagination, Button, message} from "antd"
import { SmileTwoTone } from '@ant-design/icons';
import ItemCard from "../components/itemCard";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";


const ItemList = (props) => {
    const navigate = useNavigate();
    const [itemList, setItemList] = useState([]);
    const [isListUpdate, setIsListUpdate] = useState(0);

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
                    result = await axios.get(`/rest/items/member/${props.login}`);
                    result = result.data.data.map(x=>x.Item);
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
    },[isListUpdate, props.login])
    
    return(
        <>
        <p style={{padding: "10px 220px", fontSize:"1.5rem"}}>{props.isMyList ? <>나의 공동구매</> : <><strong>{query}</strong> 검색결과</> }</p>
        <Row style={{margin:"0 200px"}}>
        {      
            itemList.map( 
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
        <Pagination size="small" defaultPageSize={8} total={itemList.length} style={{textAlign:"center"}} />
        </>
    );
}


export default ItemList;