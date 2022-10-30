import React from "react";
import { Button, Progress, message, Typography,Divider, Statistic } from 'antd';
import { LikeOutlined, FireOutlined } from '@ant-design/icons';
import {Row, Col} from "antd"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

const Item = (props) =>{
    const {itemId} = useParams();
    const [item, setItem] = useState(0);
    const [shouldUpdate, setShouldUpdate] = useState(0);
    const [auth, setAuth] = useState(0);    //비회원:0 비참여회원:1 구매자:2 멤버:3

    const dateParse = (st) => {
        const arr = st.split((/-|T|:/));
        return `${arr[0]}년 ${arr[1]}월 ${arr[2]}일 ${arr[3]}시 까지`
    }
    useEffect(()=>{
        const getItem = async () => {
            try{
                const result = await axios.get(`/rest/items/${itemId}`);
                if(result.data.result){
                    const data = result.data.data;
                    setItem(data.item_result);
                    if(props.login){
                        if(props.login == data.item_result.Payer.UserId) setAuth(2);
                        else if(data.member_result.map(x=>x.UserId).includes(props.login)) setAuth(3);
                        else setAuth(1);
                    }
                }
            } catch(err){
                console.error(err);
            }
        }
        getItem();
    }, [props.login, shouldUpdate]);

    const enroll = async () => {
        const result = await axios.post(`/rest/members/${item.id}`, {UserId: props.login, member_current: item.member_current});
        if(result){
            message.success("성공적으로 등록되었습니다.");
            setShouldUpdate(1);
        }
    };

    const deleteItem = () => {

    }



    return(
        !item ? '':
        <>  
            <div className="grouping-header-img-wrapper">
                <img className="grouping-header-img" src={item.img} />
                <div className="grouping-header-title-wrapper">
                    <Typography className="grouping-header-type">{item.field ==0 ? "택시합승" : (item.field==1 ? "공동구매" :"배달음식")}</Typography>
                    <Typography className="grouping-header-title"><strong>{item.title}</strong></Typography>
                </div>
            </div>
            
                
            <div className="grouping-page-wrapper">
                <Row gutter={128}>
                    <Col offset={2} span={13} className="gutter-row">
                        <img className="grouping-page-img" src={item.img}/>
                        <div className="grouping-page-descr-wrapper">
                            <p className="grouping-page-descr-th"> <strong>상품 링크</strong> </p>
                            <p className="grouping-page-descr-td">{item.link}</p>
                            <p className="grouping-page-descr-th"> <strong>상품 설명</strong></p>
                            <p className="grouping-page-descr-td">{item.description}</p>
                            <p className="grouping-page-descr-th"> <strong>입금 기한</strong></p>
                            <p className="grouping-page-descr-td"> {dateParse(item.due_money)} </p>
                            <p className="grouping-page-descr-th"> <strong>가격</strong></p>
                            <p className="grouping-page-descr-td"> {item.price} 원</p>
                            
                        </div>
                    </Col>
                    <Col span={9}>
                        <Row>
                            <Col span={12}><Progress style={{margin: "15px 0"}}width={190} type="circle" percent={Math.round(item.member_current/item.member_limit*100)} /></Col>
                            <Col span={12}><p className="grouping-page-progress-text"> <span>{item.member_current}</span>명 / <span>{item.member_limit}</span>명<br/>앞으로<br/><span>{(item.member_limit-item.member_current).toString()}</span>명 남음 </p></Col>
                        </Row>
                        <Divider style={{marginTop:"0px"}}></Divider>
                        <Row>
                            <Col span={12}>
                                <Statistic.Countdown valueStyle={{fontSize:"1.5rem"}} title="모집 종료까지" value={item.due_group} format="D일 H시 m분 s초" />
                            </Col>
                            <Col span={12}>
                                <Statistic valueStyle={{fontSize:"1.5rem"}} title="Feedback" value={item.like} prefix={<LikeOutlined />} />   
                            </Col>               
                        </Row>
                        <Divider></Divider>
                        <Row>
                            <Col>
                                {
                                    !item
                                    ? '' 
                                    : 
                                    <Statistic valueStyle={{fontSize:"1.5rem"}} title="구매자" value={`${item.Payer.User.unit.split(' ').reverse()[0]} ${item.Payer.User.name} | ${item.Payer.User.trust_index}`} suffix={<FireOutlined />} />  
                                }
                            </Col>               
                        </Row>
                        <Divider></Divider>
                        <Row>
                            <Col span={24}>
                                {
                                    auth==0 ? 
                                    <Button onClick={()=>{message.info("로그인을 해주세요.");}} style={{width:"100%", height: "70px"}}>참여하기</Button> :
                                    auth==1 ?
                                    <Button onClick={enroll} style={{width:"100%", height: "70px"}}>참여하기</Button> :
                                    auth==2 ?
                                    <Button onClick={()=>{deleteItem}} style={{width:"100%", height: "70px"}}>모집 취소하기</Button> :
                                    <Button disabled={true} style={{width:"100%", height: "70px"}}>참여완료</Button>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    );
}


export default Item;