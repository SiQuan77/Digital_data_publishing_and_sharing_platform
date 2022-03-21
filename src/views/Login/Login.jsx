import React, {useState, useEffect} from 'react'
import {Form, Input, Button, Checkbox, message, Divider} from 'antd';
import '../../style/view-style/login.scss'
import { useNavigate } from 'react-router-dom'
export default function Login(props) {

    let [loading,setLoading] = useState(false);
    const [login_form]=Form.useForm();
    const Navigate=useNavigate();

    useEffect(()=>{
        return ()=>{
            setLoading=()=> false;
            //    消除异步方法
        //    在此处写就是在组件卸载时调用
        }
    })

    //正常完成输入后点击登录后的回调函数
    const onFinish = (values) => {

        //进行解构赋值
        let {username,password} = values;
        setLoading(true);
        //用延时来模拟请求API的过程
        setTimeout(()=>{

            console.log(values);
            if(username==="admin"&&password==="admin"){
                values.auth=0;//普通用户权限为1
                sessionStorage.setItem("user_info",JSON.stringify(values));
                Navigate("/index",{replace:false})
            }else if(username==="user"&&password==="user"){
                values.auth=1;//普通用户权限为1
                sessionStorage.setItem("user_info",JSON.stringify(values));
                Navigate("/index",{replace:false})
            }else{
                message.error("用户名或者密码错误");
            }
            setLoading(false);
        },1400)


    };

    //finish失败的时候会调用，比如没有填完整信息！
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onReset = ()=>{
        login_form.resetFields();
    }


    return (
        <div className={'login animated fadeIn'}>
            <div className={"model"}>
                <div className={"login-form"}>
                    <h3>数字资料发布与共享平台</h3>
                    <Divider />{/*分割线*/}
                    <Form
                        name="basic"
                        initialValues={{/*remember: true*/}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        form={login_form}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{required: true, message: '请输入用户名'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{required: true, message: '请输入密码'}]}
                        >
                            <Input.Password style={{width:"96%",marginLeft:"4%"}}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width:'40%'}} loading={loading}>
                                登录
                            </Button>
                            <Button htmlType="button" style={{width:'40%',marginLeft:"10%"}} onClick={onReset}>
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>

    );
}
