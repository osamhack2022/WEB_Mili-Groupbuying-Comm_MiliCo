import { message, Button } from 'antd';
import React from 'react';
import Login from '../pages/login.js'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const NavigationBar = (props) => {
    const navigate = useNavigate();
    // const getItem = (label, key, icon, children, type) => {
    //     return {
    //         key,
    //         icon,
    //         children,
    //         label,
    //         type
    //     };
    // }
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
                <p className="nav-logo" >milicom의 로고</p>
            </Link>
            <div className="nav-btn-wrapper">
                {props.login ? 
                <>
                <Button type="link" className="nav-btn" onClick={logout} >LogOut</Button>
                <Link to="/my-item-list"><Button type="link" className="nav-btn" >My page</Button> </Link>
                </> : 
                <Login login={props.login} setLogin={props.setLogin}/>} 
            </div>
        </>
    );

}


export default NavigationBar;