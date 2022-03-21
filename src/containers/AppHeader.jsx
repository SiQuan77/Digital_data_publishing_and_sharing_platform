import React, {Component, useEffect} from 'react';
import {Dropdown, Menu, Popover} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {PoweroffOutlined, UserOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import {Navigate, useNavigate} from "react-router-dom";

export default function AppHeader(props){

    const Navigate = useNavigate();

    const {username,auth} = JSON.parse(sessionStorage.getItem("user_info"));
    // useEffect(()=>{
    //
    // },[])

    const quit_login=()=>{
        sessionStorage.removeItem("user_info");
        Navigate("/login");
        // console.log("进来了")
    }

    const float_userinfo_div = (
        <Menu>
            <Menu.Item>
                欢迎你,{username}!
            </Menu.Item>
            <Menu.Item>
                <UserOutlined />详细信息
            </Menu.Item>
            <Menu.Item onClick={quit_login}>
                <PoweroffOutlined />退出登录
            </Menu.Item>
        </Menu>
    )



        return (
            <Header className="site-layout-background" style={{ padding: 0 ,height: 40}} >
                <Dropdown overlay={float_userinfo_div} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <Avatar icon={<UserOutlined />} style={{float:'right',marginRight:'20px',cursor:"pointer"}}/>
                </Dropdown>
            </Header>
        );
}
