import React from "react";
import { Card, Input, Typography, Col, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import mainImage from "../assets/img/mainImage.png";
import taxiIcon from "../assets/img/taxiIcon.png";
import packageIcon from "../assets/img/packageIcon.png";
import deliveryIcon from "../assets/img/deliveryIcon.png";
import { Link } from 'react-router-dom';
import "../assets/css/myCss.css"
const {Title} = Typography;

class Intro extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return(
      <>
        {/* Title */}
        <Row gutter={16}> 
          <Col span={8}></Col>
          <Col className="gutter-row" span={4}>
            <img width="100%" src={mainImage} alt="mainImage"/>
          </Col>
          <Col className="gutter-row" span={4}>
            <Title style={{marginTop: "30px"}}></Title> 
            <Title level={1} style={{margin:"0 0px", fontFamily:"yangjin", color:"#FF9933", fontSize:"3.5rem"}}> Mili<br/>Com<br/>(가칭)</Title>
            <Title level={5} style={{margin:"0 0px", fontFamily:"yangjin", color:"#F8CBAD", fontSize:"1.7rem"}}> 당신 근처의 어쩌구 저쩌구 </Title> 
          </Col>
          <Col span={8}></Col>
        </Row>
        {/* Cards */}
        <Row gutter={16} style={{marginTop:"30px"}}>
          <Col span={9}></Col>
          <Col className="gutter-row" span={2}>
            <Link to="/result/taxi">
              <Card 
              cover={<img src={taxiIcon} alt="taxiIcon"/>}
              bordered={true}
              style={{fontFamily:"yangjin", textAlign:"center"}}
              hoverable={true}
              >
                택시
              </Card>
            </Link>
          </Col>
          <Col className="gutter-row" span={2}>
            <Link to="/result/taxi">
              <Card 
              cover={<img src={packageIcon} alt="packageIcon"/>}
              bordered={true}
              style={{fontFamily:"yangjin", textAlign:"center"}}
              hoverable={true}
              >
                택배
              </Card>
            </Link>
          </Col>
          <Col className="gutter-row" span={2}>
            <Link to="/result/taxi">
              <Card 
              cover={<img src={deliveryIcon} alt="deliveryIcon"/>}
              bordered={true}
              style={{fontFamily:"yangjin", textAlign:"center"}}
              hoverable={true}
              >
                배달음식
              </Card>
            </Link>
          </Col>
          <Col span={9}></Col>
        </Row>
        {/* Search Bar */}
        <Row style={{marginTop:"30px"}}>
          <Col className="gutter-row" span={8}></Col>
          <Col className="gutter-row" span={8}>
            <Input 
            placeholder="원하는 상품을 검색해서 모집하세요" 
            size="large"
            prefix={<SearchOutlined />}
            />
          </Col>
          <Col className="gutter-row" span={8}></Col>
        </Row>
      </>
    );
  };  

}
export default Intro;