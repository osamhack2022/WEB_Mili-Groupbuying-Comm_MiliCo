import React from "react";
import {
    AutoComplete,
    Button,
    Cascader,
    Form,
    Input,
    Select,
  } from 'antd';
const { Option } = Select;

class Register extends React.Component{
    units = [
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
    formItemLayout = {
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
    tailFormItemLayout = {
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
    constructor(props){
        super(props);
        this.state={}
    }
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    
    render(){
        return(
            <Form
                {...this.formItemLayout}
                name="register"
                className = "register-form"
                onFinish={this.onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="service number"
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
                        <Option value="J1">대장</Option>
                        <Option value="J2">중장</Option>
                        <Option value="J3">소장</Option>
                        <Option value="J4">준장</Option>
                        <Option value="R1">대령</Option>
                        <Option value="R2">중령</Option>
                        <Option value="R3">소령</Option>
                        <Option value="W1">대위</Option>
                        <Option value="W2">중위</Option>
                        <Option value="W3">소위</Option>
                        <Option value="S1">준위</Option>
                        <Option value="S2">원사</Option>
                        <Option value="S3">상사</Option>
                        <Option value="S4">중사</Option>
                        <Option value="S5">하사</Option>
                        <Option value="B1">병장</Option>
                        <Option value="B2">상병</Option>
                        <Option value="B3">일병</Option>
                        <Option value="B4">이병</Option>

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
                    <Cascader options={this.units} />
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
  
                <Form.Item {...this.tailFormItemLayout}>
                    <Button className="register-form-btn" type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Register;