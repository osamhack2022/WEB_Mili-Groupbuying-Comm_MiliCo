import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps, Table, Tag, Space, Row, Col } from 'antd';
import egg1 from '../assets/img/egg1.png';
import egg5 from '../assets/img/egg5.png';
const {Step} = Steps;


const ItemManage = (props) => {
    const {itemId} = useParams();
    const [item, setItem] = useState(0);
    const [shouldUpdate, setShouldUpdate] = useState(0);
    const [auth, setAuth] = useState(0);    //비회원:0 비참여회원:1 구매자:2 멤버:3

    useEffect(()=>{
        const getItem = async () => {
            try{
                const result = await axios.get(`/rest/items/${itemId}`);
                if(result.data.result){
                    const data = result.data.data;
                    setItem(data.item_result);
                    console.log(data);
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


    const columns = [
      {
        title: '소속',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '온도',
        dataIndex: 'temp',
        key: 'temp',
      },
      {
          title: '구매개수',
          dataIndex: 'buyInfo',
          key: 'buyInfo',
      },
      {
        title: '입금여부',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
          <>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a>입금확인요청</a>
            <a>외상요청</a>
          </Space>
        ),
      },
    ];
    const data = [
      {
        key: '1',
        name: '김육군',
        age: 32,
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: '김공군',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: '김해군',
        age: 32,
        tags: ['cool', 'teacher'],
      },
      {
        key: '4',
        name: '김해군',
        age: 32,
        tags: ['cool', 'teacher'],
      },
      {
        key: '5',
        name: '김해군',
        age: 32,
        tags: ['cool', 'teacher'],
      },
      {
        key: '6',
        name: '김해군',
        age: 32,
        tags: ['cool', 'teacher'],
      },
      {
        key: '7',
        name: '김해군',
        age: 32,
        tags: ['cool', 'teacher'],
      },
      {
        key: '8',
        name: '김해군',
        age: 32,
        tags: ['cool', 'teacher'],
      },

    ];
    return(
        <>
            <p style={{fontFamily:"Noto Sans KR", fontSize:"1rem", textAlign:"center"}}>「부산평택까지 가는 택시 구합니다.」 의 진행상황</p>
            <p style={{fontFamily:"Noto Sans KR", fontSize:"3rem", fontWeight: "500", textAlign:"center"}}>세 명 더 남았습니다.</p>
            <div>
            <Steps style={{width: "70%", margin:"0 auto", marginBottom:"80px"}}>
                <Step status="finish" title="모집" icon={<UserOutlined />} />
                <Step status="finish" title="입금" icon={<SolutionOutlined />} />
                <Step status="process" title="주문" icon={<LoadingOutlined />} />
                <Step status="wait" title="배송" icon={<SmileOutlined />} />
                <Step status="wait" title="도착" icon={<SmileOutlined />} />
            </Steps>
            </div>
            <Row>
              <Col span={8}>
                <div style={{padding:"10px 0px 10px 220px", width: "100%", height: "100%" }}>
                  <div style={{fontFamily:"Noto Sans KR", padding:"30px 0", backgroundColor: "#c9e5ff", textAlign: "center", color: "#1890ff", borderRadius:"10px", width: "100%", height: "100%" }}>
                    <div>
                      <p style={{fontSize:"1rem", margin:0}}>1인당 납부 금액</p>
                      <p style={{fontSize:"1.5rem", marginBottom:"20px"}} ><strong>10000 + 구매자 인센티브</strong></p>
                      <p style={{fontSize:"1rem", margin:0}}>납부계좌</p>
                      <p style={{fontSize:"1.5rem", marginBottom:"20px"}}><strong>하나은행 00000101010101010</strong></p>
                    </div>
                    {/* <img src={egg1} style={{marginBottom:"20px"}}></img> */}
                    <div className="motherfucking hand" style={{position:"relative", marginTop:"0px"}}>
                      <img src={egg5} style={{marginBottom:"20px"}}/>
                      <p style={{position:"absolute", bottom:"100px", left:"170px", backgroundColor:"#FFD047", padding:"0 10px", borderRadius:"30px", color:"#D68142", fontFamily:"Noto Sans KR Black", fontSize:"3em"}}>5%</p>
                    </div>
                    <p>구매자 인센티브는 모집인원이 다 모이면 알에서 랜덤으로 등장합니다!</p>
                  </div>
                </div>
              </Col>
              <Col span={16}>
                <Table pagination={false} style={{ width: "80%", margin:"0px 0px 0px 80px", padding:"50px"}}columns={this.columns} dataSource={this.data}/>
              </Col>
            </Row>
        </>
  );
}

export default ItemManage;