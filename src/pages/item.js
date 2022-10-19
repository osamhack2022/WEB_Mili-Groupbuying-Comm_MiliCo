import React from "react";
import { Button, Progress, Typography,Divider, Statistic } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import {Row, Col} from "antd"

class Item extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <>  
                <div className="grouping-header-img-wrapper">
                    <img className="grouping-header-img" src="https://open.lge.co.kr/link/2020/ha/usp_banner/12/3101_ha_brandView/images/01.jpg" />
                    <div className="grouping-header-title-wrapper">
                        <Typography className="grouping-header-type">택시모집</Typography>
                        <Typography className="grouping-header-title"><strong>부대에서 XX시외버스터미널까지 같이 가실 분 구합니다.</strong></Typography>
                    </div>
                </div>
                
                    
                <div className="grouping-page-wrapper">
                    <Row gutter={128}>
                        <Col offset={2} span={13} className="gutter-row">
                            <img className="grouping-page-img" src="https://open.lge.co.kr/link/2020/ha/usp_banner/12/3101_ha_brandView/images/01.jpg"/>
                            <div className="grouping-page-descr-wrapper">
                                <p className="grouping-page-descr-th"> <strong>상품 링크</strong> </p>
                                <p className="grouping-page-descr-td">https://open.lge.co.kr/link/2020/ha/usp_banner/12/3101_ha_brandView/images/01.jpg</p>
                                <p className="grouping-page-descr-th"> <strong>상품 설명</strong></p>
                                <p className="grouping-page-descr-td">국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다. 새로운 회계연도가 개시될 때까지 </p>
                                <p className="grouping-page-descr-th"> <strong>입금기한</strong></p>
                                <p className="grouping-page-descr-td"> 2019년 12월 11일 13:00 </p>
                                <p className="grouping-page-descr-th"> <strong>가격</strong></p>
                                <p className="grouping-page-descr-td">10000원 </p>
                                
                            </div>
                        </Col>
                        <Col span={9}>
                            <Row>
                                <Col span={12}><Progress style={{margin: "15px 0"}}width={190} type="circle" percent={50} /></Col>
                                <Col span={12}><p className="grouping-page-progress-text"> <span>4</span>명/<span>10</span>명<br/>앞으로<br/><span>6</span>명 남음 </p></Col>
                            </Row>
                            <Divider style={{marginTop:"0px"}}></Divider>
                            <Row>
                                <Col span={12}>
                                    <Statistic.Countdown valueStyle={{fontSize:"1.5rem"}} title="모집 종료까지" value={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30} format="D일 H시 m분 s초" />
                                </Col>
                                <Col span={12}>
                                    <Statistic valueStyle={{fontSize:"1.5rem"}} title="Feedback" value={1128} prefix={<LikeOutlined />} />   
                                </Col>               
                            </Row>
                            <Divider></Divider>
                            <Row>
                                <Col>
                                    <Statistic valueStyle={{fontSize:"1.5rem"}} title="모집책임자" value={`통신중대 이찬구 | 충성지수`} suffix={<LikeOutlined />} />   
                                </Col>               
                            </Row>
                            <Divider></Divider>
                            <Row>
                                <Col span={24}>
                                    <Button style={{width:"100%", height: "70px"}}>참여하기</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}


export default Item;