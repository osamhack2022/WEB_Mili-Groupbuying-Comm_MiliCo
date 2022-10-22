import React from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {
    message,
    Button,
    Cascader,
    Form,
    Input,
    Select,
  } from 'antd';

const { Option } = Select;


function Register (props){
    const navigate = useNavigate();

    const units = [
        {
          value: '4div',
          label: '4사단',
          children: [
            {
              value: '44bde',
              label: '44여단',
              children: [
                {
                  value: '4co',
                  label: '4중대',
                },
              ],
            },
          ],
        },
        {
          value: '0div',
          label: '0사단',
          children: [
            {
              value: '0bde',
              label: '0여단',
              children: [
                {
                  value: '0co',
                  label: '0중대',
                },
              ],
            },
          ],
        },
    ];
    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
    };

    const onFinish = async (values) => {
        try{
            const result = await axios.post("/rest/users", {
                ...values,
                unit: values.unit.join(' '),
                trust_index: 36
            });
            if(result.data.result){
                message.success('회원가입이 완료되었습니다.');
                navigate('/');
            }
        } catch(err){
            if(err.response.data.duplicate){
                message.error('이미 가입된 회원입니다.');
                navigate('/');
            }else{    
                console.log(err);
            }
        }
    
    };

    return(
        <Form
            {...formItemLayout}
            name="register"
            className = "register-form"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="service_id"
                label="군번"
                rules={[
                    {
                    required: true,
                    message: '군번을 입력해주세요',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || /^\d{2}-\d{8}$/.test(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('군번을 정확히 입력해주세요'));
                        },
                    }),
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="비밀번호"
                rules={[
                    {
                    required: true,
                    message: '비밀번호를 입력해주세요',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="비밀번호 확인"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                    required: true,
                    message: '비밀번호를 확인해주세요',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="name"
                label="이름"
                rules={[
                    {
                        required: true,
                        message: '이름을 입력해주세요',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="rank"
                label="계급"
                rules={[
                    {
                        required: true,
                        message: '계급을 입력해주세요',
                    },
                ]}
            >
                <Select placeholder="계급을 입력해주세요">
                    <Option value={0}>병장</Option>
                    <Option value={1}>상병</Option>
                    <Option value={2}>일병</Option>
                    <Option value={3}>이병</Option>

                </Select>
            </Form.Item>

            <Form.Item
                name="unit"
                label="부대"
                rules={[
                    {
                    type: 'array',
                    required: true,
                    message: '소속 부대를 지정해주세요',
                    },
                ]}
            >
                <Cascader options={units} />
            </Form.Item>

            <Form.Item
                name="phone"
                label="전화번호"
                rules={[
                    {
                        required: true,
                        message: '전화번호를 입력해주세요',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || /^\d{3}-\d{4}-\d{4}$/.test(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('전화번호를 정확히 입력해주세요'));
                        },
                    }),
                ]}
            >
                <Input/>
            </Form.Item>       
            <Form.Item {...tailFormItemLayout}>
                <Button className="register-form-btn" type="primary" htmlType="submit">
                    회원가입
                </Button>
            </Form.Item>
        </Form>
    );
}
export default Register;