import React from "react";
import {toast} from "react-toastify";
import {Button, Form, Input, Select, Typography} from "antd";
import {createShipment} from "../../api/pcStaffApi";

async function onSubmit(maDonHang: string) {
    console.log("submit");

    await createShipment(maDonHang, )
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


class ConfirmShipment extends React.Component {
    onFinish = (values: any) => {
        console.log('Success:', values);
        onSubmit(this.maDonHang, this.maDiemDen,);
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

                    <Form.Item
                        label="Mã điểm đến"
                        name="maDiemDen"
                        rules={[{ required: true, message: 'Vui lòng nhập mã điểm ến' }]}
                    >
                        <Input style={{
                            margin: '8px'
                        }}/>
                    </Form.Item>

                    <Form.Item
                        label="Loại điểm đến"
                        name="type"
                        rules={[{ required: true, message: 'Vui lòng chọn loại điểm đến' }]}
                    >
                        <Select>
                            <Select.Option value="to-gather">Điểm tập kết</Select.Option>
                            <Select.Option value="to-trans">Điểm giao dịch</Select.Option>
                        </Select>
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

export default ConfirmShipment;