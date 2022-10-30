import { message, Button } from 'antd';
import React from 'react';
import Login from '../pages/login.js'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MessageDrawer from './messageDrawer.js';

const NavigationBar = (props) => {
    const navigate = useNavigate();
    const logout = async () => {
        const result = await axios.delete('/rest/users/sessions');
        if(result.data.result){
            props.setLogin(0);
            message.success("로그아웃됐습니다.");
            navigate("/");
        }
        
    }

    return(
        <>
            <Link to="/">
                <p className="nav-logo" >MARKET 작전모</p>
            </Link>
            &nbsp;{props.login ? "- 95사단 45연대 7대대 마켓": ""}
            <div className="nav-btn-wrapper">
                {props.login ? 
                <>
                <Button type="link" className="nav-btn" onClick={logout} >LogOut</Button>
                <Link to="/my-item-list"><Button type="link" className="nav-btn" >My page</Button> </Link>
                <MessageDrawer login={props.login}/>
                </> : 
                <Login login={props.login} setLogin={props.setLogin}/>} 
            </div>
        </>
    );

}


export default NavigationBar;