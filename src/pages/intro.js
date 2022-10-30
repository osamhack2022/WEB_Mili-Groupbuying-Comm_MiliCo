import React from "react";
import { Card, Input, Typography, Col, Row, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import mainImage from "../assets/img/mainImage.png";
import taxiIcon from "../assets/img/taxiIconC.png";
import packageIcon from "../assets/img/packageIconC.png";
import deliveryIcon from "../assets/img/deliveryIconC.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const {Title} = Typography;


const Intro = (props) =>{
  const navigate = useNavigate();
    return(
      <>
        {/* Title */}
        <Row style={{marginTop:"35px"}} gutter={16}> 
          <Col span={8}></Col>
          <Col className="gutter-row" span={4}>
            <img className="intro-title-img"src={mainImage} alt="mainImage"/>
          </Col>
          <Col className="gutter-row" span={4}>
            <h1 className="intro-title-main"> 작<span>은것도</span><br/>전<span>우들과</span><br/>모<span>아사자</span></h1>
            <Title className="intro-title-sub" level={5}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MARKET</Title> 
          </Col>
          <Col span={8}></Col>
        </Row>
        {/* Search Bar */}
        <Row className="intro-search-wrapper">
          <Col className="gutter-row" span={9}></Col>
          <Col className="gutter-row" span={6}>
            <Input 
            placeholder="원하는 상품을 검색해서 모집하세요" 
            style={{marginTop:"10px", borderBottomStyle:"solid", borderBottomWidth:"1px",  fontSize:"1.5rem", height:"70px", width:"100%"}}
            size="large"
            bordered={false}
            prefix={<SearchOutlined />}
            onPressEnter={(e)=>{navigate(`/item-list/?searchWord=${e.target.value}`)}}
            />
          </Col>
          <Col className="gutter-row" span={9}></Col>
        </Row>
        {/* Cards */}
        <Row className="intro-cards-wrapper" gutter={32}>
          <Col span={9}></Col>
          <Col className="gutter-row" span={2}>
            <Link to="/item-list?searchWord=taxi">
              <Card 
              className="intro-card"
              cover={<img src={taxiIcon} alt="taxiIcon"/>}
              bordered={false}
              hoverable={true}
              >
                택시합승
              </Card>
            </Link>
          </Col>
          <Col className="gutter-row" span={2}>
            <Link to="/item-list?searchWord=market">
              <Card 
              className="intro-card"
              cover={<img src={packageIcon} alt="packageIcon"/>}
              bordered={false}
              hoverable={true}
              >
                공동구매
              </Card>
            </Link>
          </Col>
          <Col className="gutter-row" span={2}>
            <Link to="/item-list?searchWord=delivery">
              <Card 
              className="intro-card"
              cover={<img src={deliveryIcon} alt="deliveryIcon"/>}
              bordered={false}
              hoverable={true}
              >
                배달음식
              </Card>
            </Link>
          </Col>
          <Col span={9}></Col>
        </Row>
        
      </>
    );
}
export default Intro;