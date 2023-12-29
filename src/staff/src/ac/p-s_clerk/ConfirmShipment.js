import React from "react";
import {toast} from "react-toastify";
import {Button, Input, Typography} from "antd";
import {confirmShipment} from "../../api/psStaffApi";

async function onSubmit(maDonHang: string) {
    console.log("submit");

    await confirmShipment(maDonHang)
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
    maDonHang: string = '';

    onChangeMaDonHang = (e: any) => {
        this.maDonHang = e.target.value;
    }

    render() {
        return (
            <div>
                <Typography.Title level={3}>Xác nhận hàng đã đến điểm giao dịch</Typography.Title>
                <div style={{
                    width: '50%',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography.Text style={{
                        fontWeight: 'bold',
                    }}>
                        Mã đơn hàng:
                        <Input style={{
                            margin: '8px'
                        }} onChange={this.onChangeMaDonHang}/>
                    </Typography.Text>
                </div>

                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    marginTop: '16px',
                }}>
                    <Button type={"primary"} size={"large"}
                            onClick={() => onSubmit(this.maDonHang)}
                    >
                        Xác nhận
                    </Button>
                    <div style={{ width: '20%' }}/>
                </div>
            </div>
        );
    }
}

export default ConfirmShipment;