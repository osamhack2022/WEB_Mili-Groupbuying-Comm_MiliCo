import React from "react";
import axios from "axios";
import { Select, message, InputNumber, Slider, Divider, Button, Form, Input, Radio, DatePicker, TimePicker } from 'antd';
import { useNavigate } from "react-router-dom";

const ItemCreate = (props) => {
    const PRESENTATIONIMAGE = "https://postfiles.pstatic.net/MjAyMjEwMjdfNzEg/MDAxNjY2ODYzMzAyNTIy.S6q8tfqOpwj4ImgoDBeuvwCzX38mqNNkdbnh0NH4_gIg.Ou8KHWv7GHP87zafQsfR0AKmTXGd7IDXBq2u6wYSkfkg.PNG.cgl00/haha.PNG?type=w966"
    const navigate = useNavigate();
    const formItemLayout = 
        {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 14,
            },
        };
    const buttonItemLayout =
        {
            wrapperCol: {
                span: 24,
                offset: 22,
            },
        };
    const onFinish = async (values) => {
        try{
            if(!props.login){ 
                message.error("로그인을 해주세요.");
                throw "no session"; }
            const result = await axios.post("/rest/items", {...values, img: PRESENTATIONIMAGE, UserId:props.login});
            console.log(result);
            if(result.data.result){
                message.success("성공적으로 등록되었습니다.");
                navigate(`/item/${result.data.data.id}`);
            }
        } catch(err){
            console.error(err);
        }
    }
    return (
        <div style={{padding: "0 100px", fontFamily:"Noto Sans KR"}}>
            <br /><br /><br />
            <Form
            onFinish={onFinish}
            labelAlign="left"
            colon={false}
            {...formItemLayout}
            layout='horizontal'
            style={{width:"1300px", margin: "0 auto"}}
            >
                <Divider orientation="left">상품정보</Divider>
                <div>
                    <Form.Item required={true} label="분야" name="field">
                        <Radio.Group 
                        >
                            <Radio.Button value="0">택시합승</Radio.Button>
                            <Radio.Button value="1">공동구매</Radio.Button>
                            <Radio.Button value="2">배달음식</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                     <Form.Item required={true} label="상품제목" name="title">
                        <Input placeholder="제목" />
                    </Form.Item>
                    <Form.Item required={true} label="상품링크" name="link">
                        <Input placeholder="링크" />
                    </Form.Item>   
                    <Form.Item required={true} label="상품설명" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item required={true} label="가격" name="price">
                        <InputNumber 
                        formatter={(value) => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\₩\s?|(,*)/g, '')} 
                        addonAfter="₩" 
                            />
                    </Form.Item>
                </div>
                <br /><br />
                <Divider orientation="left">모집정보</Divider>
                <div>
                    <Form.Item 
                    required={true}
                    label="모집인원&nbsp;(본인 제외)"
                    name="member_limit"
                    >
                        <Slider
                        max={30}
                        marks={{
                            1: '1',
                            2: '2',
                            3: '3',
                            4: '4',
                            5: '5',
                            10: '10',
                            20: '20',
                            30: '30'
                        }}
                        />
                    </Form.Item>
                    <Form.Item required={true} label="입금계좌">
                        <Input.Group compact>
                            <Form.Item
                                name="bank"
                                noStyle
                                rules={[
                                {
                                    required: true,
                                    message: '입금받을 계좌를 선택해주세요',
                                },
                                ]}
                            >
                                <Select placeholder="입금은행" >
                                    <Select.Option value="IBK기업은행">IBK기업은행</Select.Option>
                                    <Select.Option value="KB국민은행">KB국민은행</Select.Option>
                                    <Select.Option value="NH농협은행">NH농협은행</Select.Option>
                                    <Select.Option value="신한은행">신한은행</Select.Option>
                                    <Select.Option value="우리은행">우리은행</Select.Option>
                                    <Select.Option value="카카오뱅크">카카오뱅크</Select.Option>
                                    <Select.Option value="하나은행">하나은행</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="account"
                                required={true}
                                noStyle
                                rules={[
                                {
                                    required: true,
                                    message: '계좌번호를 확인해주세요',
                                },
                                ]}
                            >
                                <Input
                                style={{
                                    width: '50%',
                                }}
                                placeholder="계좌번호"
                                />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item name="due_group" required="true" label="모집기한" rules={[{ type: 'object', required: true, message: '모집기한을 입력해주세요' }]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item name="due_money" required="true" label="입금 기한" rules={[{ type: 'object', required: true, message: '입금기한을 입력해주세요' }]}>
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                </div> 
                <Form.Item {...buttonItemLayout}>
                    <Button size="large" type="primary" htmlType="submit">생성하기</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default ItemCreate