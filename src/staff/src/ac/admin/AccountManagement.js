import React from "react";
import {Button, Form, Input, Select, Spin, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import {submitRegister} from "../../api/accountCreationApi";


class ConfirmShipment extends React.Component {
    state : {
        loading: boolean,
    } = {
        loading: false,
    }

    roleOptions = [
        { value: 'p-c_head', label: 'Point of Collection Manager' },
        { value: 'p-s_head', label: 'Point of Service Manager' },
    ];

    onFinished = (values) => {
        console.log(values);
        this.setState({ loading: true });
        submitRegister(values).then(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Typography.Title level={3}>Tạo tài khoản</Typography.Title>
                <Form onValuesChange={this.onChange}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ maxWidth: 600 }}
                      onFinish={this.onFinished}
                >
                    <Form.Item
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mât khẩu"
                        name="password"
                        tooltip={{ title: 'Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt', icon: <InfoCircleOutlined /> }}
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu', pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/},
                            { pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt' },
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Nhập lai mật khẩu"
                        name="repassword"
                        rules={[
                            { required: true, message: 'Vui lòng nhập lại mật khẩu', },
                            { pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: 'Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="Vai trò"
                        name="role"
                        rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                    >
                        <Select options={this.roleOptions}></Select>
                    </Form.Item>
                    <Form.Item>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'right',
                            alignItems: 'center',
                            marginTop: '16px',
                        }}>
                            <Button type={"primary"} size={"large"}
                                    htmlType={"submit"}
                            >
                                Xác nhận
                            </Button>
                            <div style={{ width: '20%' }}/>
                        </div>
                    </Form.Item>
                </Form>

            </Spin>
        );
    }
}

export default ConfirmShipment;