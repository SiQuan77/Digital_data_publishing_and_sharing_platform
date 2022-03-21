import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {NavLink} from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function AppSider(props) {

    const [collapsed, setCollapsed] = useState(false);
    const {username,auth} = JSON.parse(sessionStorage.getItem("user_info"));
    //因为session中取到的是字符串，而非对象

    const onCollapse = collapsed =>{
        setCollapsed(collapsed)
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>

            <div id={"logo_header"} />

            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="管理员才能看到的功能" style={{display: auth===0 ? '':'none'}}>
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>

                <Menu.Item key="9" icon={<FileOutlined />}>
                    <NavLink to={"/login"}>返回登录</NavLink>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}