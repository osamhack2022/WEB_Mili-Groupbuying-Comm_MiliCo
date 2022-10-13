import { Button } from 'antd';
import React from 'react';
import Login from '../pages/login.js'
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component{
    getItem(label, key, icon, children, type){
        return {
            key,
            icon,
            children,
            label,
            type
        };
    }
    constructor(props){
        super(props);
        this.state = {  
        };
    }

    render(){
        return(
            <>
                <Link to="/">
                    <p className="nav-logo" >milicom의 로고</p>
                </Link>
                <div className="nav-btn-wrapper">
                    <Login />
                    <Button className="nav-btn" >뭔가 버튼</Button>
                </div>
            </>
        );
    }
}


export default NavigationBar;