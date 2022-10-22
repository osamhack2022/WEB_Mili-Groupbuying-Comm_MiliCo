import react, {useState, } from "react";
import { Link } from "react-router-dom"
import { message, Alert, Button, Modal, Checkbox, Form, Input, Typography} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";


const Login = (props) =>{
    const [loginFail, setLoginFail] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // login modal funcs 
    const showModal = () => {
        setLoginFail(false);
        setIsModalOpen(true);
    }
    const hideModal = () => {
        setLoginFail(false);
        setIsModalOpen(false);
    }
    const onFinish = async (values) => {
        const result = await axios.post("/rest/users/sessions", values);
        if(result.data.result){
            props.setLogin(result.data.data.id);
            message.success("환영합니다");
            hideModal();
        }else if(result.status==500){
            console.log("DB error");
        }else{
            setLoginFail(true);
        }
    };
    return(
        <>
        <Button className="nav-btn" type="primary" onClick={showModal}>
            로그인
        </Button>
        <Modal footer={null} title={null} open={isModalOpen} onCancel={hideModal}>
            <Typography.Title className="login-title">Login</Typography.Title>
            <Form
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
            >
                <Form.Item
                    name="service_id"
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
                    <Link to="/forgot" onClick={hideModal}>
                        <p className="login-form-forgot">
                            비밀번호 찾기
                        </p>
                    </Link>
                </Form.Item>

                <Form.Item>
                        { loginFail ? <Alert style={{ marginBottom:"20px"}} message="&nbsp;군번 혹은 비밀번호가 일치하지 않습니다." type="error" showIcon/> : <></> }
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            로그인
                        </Button>
                </Form.Item>
            </Form>
            <div className="login-link-wrapper">
                <Link to="/register" onClick={hideModal}>
                    <p>     
                    milicom을 처음 사용하시나요?
                    </p>
                </Link>
            </div>
        </Modal>
        </>  
    );
}



export default Login;