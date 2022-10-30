import { Button, Drawer, Badge, Row, Col , Statistic, Card} from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import axios from 'axios';
import {Link} from "react-router-dom";
import React, { useState, useEffect } from 'react';
const MessageDrawer = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(()=>{
    const getMessage = async () => {
        try{
            console.log(props.login);
            const result = await axios.get(`rest/messages/${props.login}`);
            console.log(result);
            setMessage(result.data.data);
        } catch(err){
            console.error(err);
        }
    }
    getMessage();
  },[])
  const showDrawer = async() => {
    
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
        <>
        <Badge count={props.login==3?1:0}>
        <Button type="primary" onClick={showDrawer}>
                Message
            </Button>
        </Badge>
        <Drawer
            title="Message (차병호 이병님)"
            placement="right"
            closable={false}
            onClose={onClose}
            open={open}
            key="right"
        >
        <div className="site-statistic-demo-card" style={{padding: "10px", background: "#ececec"}}>
          <Row gutter={16}>
            <Col span={24}>
              <Card>
                <Statistic
                  title="미입금 된 공동구매 건이 있습니다. (바로가기)"
                  value={25900}
                  valueStyle={{
                    color: '#cf1322',
                  }}
                  prefix={<DollarOutlined />}
                  suffix="₩"
                />
              </Card>
            </Col>
          </Row>
        </div>
        </Drawer>
        </>
  );
};
export default MessageDrawer;