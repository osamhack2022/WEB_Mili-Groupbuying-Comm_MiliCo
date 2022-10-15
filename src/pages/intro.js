import React from "react";
import { Card, Input, Typography, Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import mainImage from "../assets/img/mainImage.png";
import taxiIcon from "../assets/img/taxiIcon.png";
import packageIcon from "../assets/img/packageIcon.png";
import deliveryIcon from "../assets/img/deliveryIcon.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const {Title} = Typography;


const Intro = () =>{
  const navigate = useNavigate();
    return(
      <>
        {/* Title */}
        <Row gutter={16}> 
          <Col span={8}></Col>
          <Col className="gutter-row" span={4}>
            <img className="intro-title-img"src={mainImage} alt="mainImage"/>
          </Col>
          <Col className="gutter-row" span={4}>
            <Title className="intro-title-main" level={1}> Mili<br/>Com<br/>(가칭)</Title>
            <Title className="intro-title-sub" level={5}> 당신 근처의 어쩌구 저쩌구 </Title> 
          </Col>
          <Col span={8}></Col>
        </Row>
        {/* Cards */}
        <Row className="intro-cards-wrapper" gutter={16}>
          <Col span={9}></Col>
          <Col className="gutter-row" span={2}>
            <Link to="/result/taxi">
              <Card 
              className="intro-card"
              cover={<img src={taxiIcon} alt="taxiIcon"/>}
              bordered={true}
              hoverable={true}
              >
                택시합승
              </Card>
            </Link>
          </Col>
          <Col className="gutter-row" span={2}>
            <Link to="/result/taxi">
              <Card 
              className="intro-card"
              cover={<img src={packageIcon} alt="packageIcon"/>}
              bordered={true}
              hoverable={true}
              >
                공동구매
              </Card>
            </Link>
          </Col>
          <Col className="gutter-row" span={2}>
            <Link to="/result/taxi">
              <Card 
              className="intro-card"
              cover={<img src={deliveryIcon} alt="deliveryIcon"/>}
              bordered={true}
              hoverable={true}
              >
                배달음식
              </Card>
            </Link>
          </Col>
          <Col span={9}></Col>
        </Row>
        {/* Search Bar */}
        <Row className="intro-search-wrapper">
          <Col className="gutter-row" span={8}></Col>
          <Col className="gutter-row" span={8}>
            <Input 
            placeholder="원하는 상품을 검색해서 모집하세요" 
            style={{marginTop:"30px", fontSize:"1.5rem", height:"70px", width:"100%"}}
            prefix={<SearchOutlined />}
            onPressEnter={()=>{navigate('/result')}}
            />
          </Col>
          <Col className="gutter-row" span={8}></Col>
        </Row>
      </>
    );
}
export default Intro;