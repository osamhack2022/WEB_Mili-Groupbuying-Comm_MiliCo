import react from "react";
import { Link } from "react-router-dom"
import { Button, Modal, Checkbox, Form, Input, Typography} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';


class Login extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
        }
    }
    // login modal funcs 
    showModal = () => {
        this.setState({ isModalOpen :true });
    }
    hideModal = () => {
        this.setState({ isModalOpen :false });
    }
    handleOk = () => {
        this.setState({ isModalOpen :false });
    }
    handleCancel = () => {
        this.setState({ isModalOpen :false });
    }
    // login input form funcs
    onFinish = (values) => {
        console.log('Success:', values);
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render(){
        return(
            <>
            <Button className="nav-btn" type="primary" onClick={this.showModal}>
              로그인
            </Button>
            <Modal footer={null} title={null} open={this.state.isModalOpen} onCancel={this.handleCancel}>
                <Typography.Title className="login-title">Login</Typography.Title>
                <Form
                name="normal_login"
                className="login-form"
                onFinish={this.onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: '군번을 입력해주세요',},]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '비밀번호를 입력해주세요',},]}
                    >
                        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>저장하기</Checkbox>
                        </Form.Item>
                        <Link to="/forgot" onClick={this.hideModal}>
                            <p className="login-form-forgot">
                                비밀번호 찾기
                            </p>
                        </Link>
                    </Form.Item>

                    <Form.Item>
                        <Link to="/" onClick={this.hideModal}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                로그인
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
                <div className="login-link-wrapper">
                    <Link to="/register" onClick={this.hideModal}>
                        <p>     
                        milicom을 처음 사용하시나요?
                        </p>
                    </Link>
                </div>
            </Modal>
          </>  
        );
    }
}


export default Login;