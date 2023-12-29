import React from "react";
import {toast} from "react-toastify";
import {Button, Form, Input, Typography} from "antd";
import {createShipment} from "../../api/psStaffApi";

async function onSubmit(maDonHang: string) {
    console.log("submit");

    await createShipment(maDonHang)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            toast.success("Xác nhận thành công");
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error("Xác nhận thất bại");
        });
}


class CreateShipment extends React.Component {
    onFinish = (values: any) => {
        console.log('Success:', values);
        onSubmit(values.maDonHang);
    };

    render() {
        return (
            <div>
                <Typography.Title level={3}>Gửi hàng đi</Typography.Title>
                <Form onFinish={this.onFinish}>
                    <Form.Item
                        label="Mã đơn hàng"
                        name="maDonHang"
                        rules={[{ required: true, message: 'Vui lòng nhập mã đơn hàng' }]}
                    >
                        <Input style={{
                            margin: '8px'
                        }}/>
                    </Form.Item>

                    <Form.Item>
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'right',
                            alignItems: 'center',
                            marginTop: '16px',
                        }}>
                            <Button type={"primary"} size={"large"} htmlType={"submit"}>
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

export default CreateShipment;