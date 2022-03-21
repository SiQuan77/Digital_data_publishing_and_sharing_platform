import {Layout, Menu, Breadcrumb, message, notification, Popover, Button} from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import '../style/defaultLayout.css'
import {useNavigate} from "react-router-dom";
import loadable from "../utils/loadable";
import Avatar from "antd/es/avatar/avatar";

const AppHeader = loadable(()=>import("./AppHeader"))
const AppSider = loadable(()=>import("./AppSider"))

const { Header, Content, Footer } = Layout;

export default function DefaultLayout(props) {


    const Navigate = useNavigate();
    const user_info=sessionStorage.getItem("user_info")


    //检测是否已登录
    useEffect(()=>{
        console.log(user_info)
        if (!user_info) {
            console.log("进来了")
            notification.error({
                message:'您还未登录！请先登录！',
                description:"Please login first.",
                placement:'top'
            });
            Navigate('/login',{replace:false});


        }
    },[])


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSider />

            <Layout className="site-layout">
                <AppHeader/>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>数字资料发布与管理系统</Footer>
            </Layout>
        </Layout>
    );
}
