import React, { useState, useEffect } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
// import axios from '@/api'
// import { API } from '@/api/config'
import '@/style/view-style/login.scss'

//使用了箭头函数，当箭头函数只有一个参数时可以省略括号
const Login = props => {
    //使用钩子函数初始化state参数，loading为state中的属性，setLoading是改变loading的方法
    //这个loading主要是用于控制登录button的转圈的情况的
    const [loading, setLoading] = useState(false)

    //getFieldDecorator是一个方法，这个方法接收两个参数，第一个是表单的字段对象，
    // 第二个是验证规则。这个方法本身返回一个方法，需要将需要获取值的标签包裹进去。
    //在antd4.x版本被废弃。但是本项目用的是3.x版本
    const { getFieldDecorator } = props.form


    //处理提交的函数
    const handleSubmit = e => {
        e.preventDefault()
        //validateFields	校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
        props.form.validateFields((err, values) => {
            if (!err) {
                // console.log("接受的值为",values)
                //values={username:'admin',password:'hhhhh',auth:0}

                let { username, password } = values
                console.log(username)
                //进行简单的账户检验
                if (username!=="admin"||password !== "admin"){
                        //meesage是antd的全局提醒组件
                    console.log("进来了")
                        message.error("密码错误！")
                    return
                }




                // axios
                //     .post(`${API}/login`, { username, password })
                //     .then(res => {
                //         if (res.data.code === 0) {
                //             localStorage.setItem('user', JSON.stringify(res.data.data.user))
                //             localStorage.setItem('token', res.data.data.token)
                //             props.history.push('/')
                //             message.success('登录成功!')
                //         } else {
                //             // 这里处理一些错误信息
                //         }
                //     })
                //     .catch(err => {})

                // 这里可以做权限校验 模拟接口返回用户权限标识
                switch (values.username) {
                    case 'admin':
                        values.auth = 0
                        break
                    default:
                        values.auth = 1
                }
                //使用 localStorage 创建一个本地存储的 name/value
                //localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
                // localStorage 属性是只读的。
                localStorage.setItem('user', JSON.stringify(values))


                setLoading(true)
                setTimeout(() => {
                    message.success('登录成功!')
                    props.history.push('/')
                }, 2000)
            }
        })
    }

    useEffect(() => {
        //antd的提醒组件
        //useEffect可以让函数式组件拥有声明周期钩子.
        //带上第二个数组，但是数组内部没有任何东西，就相当于compoentDidMount()函数，组件第一次挂载时默认调用。
        //所以这里的作用是在组件刚被挂载时调用
        notification.open({
            message: '欢迎使用后台管理平台',
            duration: null,
            description: '账号admin，密码admin'
        })
        return () => {
            //在组件卸载前执行
            notification.destroy()
        }
    }, [])

    return (
        <Layout className='login animated fadeIn'>
            <div className='model'>
                <div className='login-form'>
                    <h3>后台管理系统</h3>
                    <Divider />{/*分割线*/}
                    <Form onSubmit={handleSubmit}>
                        {/*form表单的元素，这样写可以支持校验*/}
                        <Form.Item>

                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                            })(
                                //这里的Input使用的也是antd里的组件
                                <Input
                                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder='用户名'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }]
                            })(
                                <Input
                                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder='密码'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}
//	经 Form.create() 包装过的组件会自带 this.props.form 属性
export default withRouter(Form.create()(Login))
