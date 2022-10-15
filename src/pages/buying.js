import React from "react";
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps, Table, Tag, Space } from 'antd';

const {Step} = Steps;


class Buying extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    columns = [
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
      data = [
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
      ];
    render(){
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
                <div >
                <Table pagination={false} style={{ width: "80%", margin:"0 auto", padding:"50px"}}columns={this.columns} dataSource={this.data}/>
                </div>
            </>
        );
    }
}


export default Buying;