import React from 'react';
import {Form, Input, Button, Typography, Spin} from 'antd';
import './style/Login.css';
import {toast} from "react-toastify";
import config from "../config.json";

const {URL, AUTH_LOGIN_PATH} = config;

const Login = ({onLoginComplete}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem("token")) {
            onLoginComplete(localStorage.getItem("role"));
        }
    }, [onLoginComplete])

    const onFinish = (values) => {
        setLoading(true);
        fetch(URL + AUTH_LOGIN_PATH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(res => {
            if (res.status === 200) {
                toast.success("Đăng nhập thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                })
                return res.json();
            } else {
                toast.error("Đăng nhập không thành công", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                })
            }
        }).then( data => {
            const json = data.data[0]
            localStorage.setItem("token", json.token);
            localStorage.setItem("role", json.role);
            setLoading(false);
            onLoginComplete(json.role);
        },() => {
            toast("Đã có lỗi xảy ra", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            })
            setLoading(false);
        }).catch(err => {
            console.log(err);
            toast.error("Đăng nhập không thành công", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            })
            setLoading(false);
        })
    };

    const onFinishFailed = (errorInfo) => {
        toast.error("Đăng nhập không thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        })
    };

    return (
        <Spin spinning={loading}>

            <div id="mainBody">
                <Typography.Title className={"title"} level={2}>Login</Typography.Title>
                <Form
                    className={"loginForm"}
                    form={form}
                    name="normal_login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{
                            required: true,
                            message: 'Please input your Username!'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your Password!'
                        }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Spin>
    );
};

export default Login;