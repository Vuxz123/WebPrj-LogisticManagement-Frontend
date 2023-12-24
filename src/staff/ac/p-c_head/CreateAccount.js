import React from "react";
import {Button, Form, Input, Typography} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";

async function onSubmit(account) {
    console.log("submit");
    console.log(account);

    // await fetch(API_URL + '/shipments/' + maDonHang +'/create-shipment/', {
    //     method: 'POST',
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log('Success:', data);
    //         toast.success("Xác nhận thành công");
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //         toast.error("Xác nhận thất bại");
    //     });
}


class ConfirmShipment extends React.Component {
    account : {
        username: string,
        password: string,
        repassword: string,
    } = {
        username: '',
        password: '',
        repassword: '',
    };

    keys = Object.keys(this.account);

    onChange = (_, all) => {
        this.keys.forEach((key) => {
            this.account[key] = all.value;
        });
        console.log(this.account)
    }

    render() {
        return (
            <div>
                <Typography.Title level={3}>Tạo tài khoản</Typography.Title>
                <Form onValuesChange={this.onChange}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ maxWidth: 600 }}
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
                                    onSubmit={() => {
                                        console.log(this.complete)
                                        onSubmit(this.account)
                                    }}
                            >
                                Xác nhận
                            </Button>
                            <div style={{ width: '20%' }}/>
                        </div>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}

export default ConfirmShipment;