import "react-universal-hooks"
import React from 'react';
import {Button, Col, Divider, Input, Radio, Row, Select, Space, Typography, Checkbox} from "antd";
import {CarOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import Shipment from "../../type/Type";
import {VAT, GTGT, UNIT_RATE_FILE, UNIT_RATE_BOX} from "../../Util";
import ChargeTable from "./ChargeTable";
import {CheckboxChangeEvent} from "antd/lib/checkbox";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {makeShipment} from "../../api/psStaffApi";

async function calcCharge(shipment: Shipment) {
    let base: number = 0;
    let ensurence: number = 0;
    let fuel: number = 0;
    let security: number = 0;

    switch (shipment.type) {
        case "tai_lieu":
            base = UNIT_RATE_FILE * Number(shipment.content.quantity);
            ensurence = Number(shipment.content.value) * 0.01;
            security = 1000;
            break;
        case "hang_hoa":
            switch (shipment.weight.unit) {
                case "kg":
                    base = UNIT_RATE_BOX * shipment.weight.value;
                    fuel = shipment.weight.value * 1000;
                    break;
                case "g":
                    base = UNIT_RATE_BOX * shipment.weight.value / 1000;
                    fuel = shipment.weight.value;
                    break;
                default:
                    break;
            }
            ensurence = Number(shipment.content.value) * 0.015;
            security = 3000;
            break;
        default:
            break;

    }

    shipment.charge.base = base;

    shipment.charge.extra = ensurence + fuel + security;

    shipment.charge.vat = shipment.charge.base * VAT;

    shipment.charge.gtgt = shipment.charge.base * GTGT;

    shipment.charge.other = 0;

    shipment.charge.total = shipment.charge.base + shipment.charge.extra + shipment.charge.vat + shipment.charge.gtgt + shipment.charge.other;

    console.log(shipment.charge);
}

async function onSubmit(shipment: Shipment) {
    console.log("submit");

    const id = await makeShipment(shipment)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            toast.success("Xác nhận thành công");
            const FileSaver = require('file-saver');
            FileSaver.saveAs(
                new Blob(
                    [JSON.stringify(data)],
                    {type: "application/json;charset=utf-8"}
                ),
                "shipment.json"
            );
            return data._id;
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error("Xác nhận thất bại");
        });

    return id;
}

class MakeShipment extends React.Component{
    shipment: Shipment;

    constructor({props, small}) {
        super(props);
        this.state = {
            page: 1,
        }
        this.small = small;
        this.shipment = new Shipment();
    }

    renderInfoPage() {
        let info1 = (
            <Space
                style={{ width: '100%' }}
                direction={"vertical"}
            >
                <Divider type={"horizontal"} orientation={"left"}>1. Người Gửi</Divider>
                <Input
                    style={{ width: '100%' }}
                    placeholder="Họ và tên" size={8} prefix={<UserOutlined/>}
                    onChange={(e) => {
                        this.shipment.senderInfo.name = e.target.value;
                    }}
                />
                <Input
                    placeholder="Số điện thoại" size={16} type={"tel"}
                    prefix={<PhoneOutlined/>}
                    maxLength={11}
                    onChange={(e) => {
                        this.shipment.senderInfo.phone = e.target.value;
                    }}
                />
                <Input.TextArea
                    placeholder="Địa chỉ"
                    prefix={<CarOutlined/>}
                    onChange={(e) => {
                        this.shipment.senderInfo.address = e.target.value;
                    }}
                />
            </Space>
        );
        let info2 = (
            <Space
                style={{ width: '100%' }}
                direction={"vertical"}
            >
                <Divider type={"horizontal"} orientation={"left"}>2. Người Nhận</Divider>
                <Input
                    style={{ width: '100%' }}
                    placeholder="Họ và tên" size={8} prefix={<UserOutlined/>}
                    onChange={(e) => {
                        this.shipment.receiverInfo.name = e.target.value;
                    }}
                />
                <Input
                    placeholder="Số điện thoại" size={16} type={"tel"}
                    prefix={<PhoneOutlined/>}
                    maxLength={11}
                    onChange={(e) => {
                        this.shipment.receiverInfo.phone = e.target.value;
                    }}
                />
                <Input.TextArea
                    placeholder="Địa chỉ"
                    prefix={<CarOutlined/>}
                    onChange={(e) => {
                        this.shipment.receiverInfo.address = e.target.value;
                    }}
                />
            </Space>
        );
        return (
            <div>
                <Typography.Title level={3}>Tạo đơn hàng</Typography.Title>
                <Row gutter={[8,8]}>
                    <Col span={11} gutter={[8,8]}>
                        {info1}
                    </Col>
                    <Col span={1}>
                        <Divider type={"vertical"} style={{ height: '100%' }}/>
                    </Col>
                    <Col span={11} gutter={[8,8]}>
                        {info2}
                    </Col>
                </Row>
                <Divider/>
                <Space direction={"vertical"} style={{ width: '100%' }}>
                    <Row align={"middle"}>
                        <Typography.Text strong={true} >
                            3. Loại hàng hoá
                        </Typography.Text>
                        <div style={{ width: '8px' }}/>
                        <Radio.Group
                            defaultValue="a"
                            onChange={(e) => {
                                this.shipment.type = e.target.value;
                            }}
                        >
                            <Radio.Button value="tai_lieu">Tài Liệu</Radio.Button>
                            <Radio.Button value="hang_hoa">Hàng hoá</Radio.Button>
                        </Radio.Group>
                    </Row>
                    <div>
                        <Typography.Text strong={true} >
                            4. Nội dung trị giá bưu gửi
                        </Typography.Text>
                        <div style={this.small ? {
                            width: '100%',
                            border: '1px solid #d9d9d9',
                            borderRadius: '2px',
                            padding: '4px',
                            alignContent: 'center',
                        } : {
                            width: '50%',
                            border: '1px solid #d9d9d9',
                            borderRadius: '2px',
                            padding: '4px',
                            alignContent: 'center',
                        }}>
                            <table style={{width: 'auto'}}>
                                <tbody>
                                <tr style={{
                                    backgroundColor: 'lightcyan',
                                }}>
                                    <th style={{width: '15%'}}>Nội dung</th>
                                    <th style={{width: '35%'}}>Số lượng</th>
                                    <th style={{width: '35%'}}>Trị giá</th>
                                    <th style={{width: '15%'}}>Giấy tờ đính kèm</th>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography.Text>
                                            Tổng
                                        </Typography.Text>
                                    </td>
                                    <td>
                                        <Input
                                            style={{ width: '100%' }}
                                            placeholder="Số lượng"
                                            type={"number"}
                                            onChange={(e) => {
                                                this.shipment.content.quantity = Number(e.target.value);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <Space.Compact style={{ width: '100%' }}>
                                            <Input
                                                placeholder="Trị giá"
                                                type={"number"}
                                                onChange={(e) => {
                                                    this.shipment.content.value = Number(e.target.value);
                                                }}
                                            />
                                            <Select
                                                defaultValue="VND"
                                                onChange={(e) => {
                                                    this.shipment.content.currency = e;
                                                }}
                                            >
                                                <Select.Option value="VND">VND</Select.Option>
                                                <Select.Option value="USD">USD</Select.Option>
                                            </Select>
                                        </Space.Compact>
                                    </td>
                                    <td style={{alignContent: "center", justifyContent: "center"}}>
                                        <Input
                                            style={{ width: "max-content" }}
                                            placeholder="Giấy tờ đính kèm"
                                            type={"checkbox"}
                                            onChange={(e) => {
                                                this.shipment.content.document = e.target.checked;
                                            }}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <Typography.Text strong={true} >
                            5. Dịch vụ đặc biệt/Cộng thêm
                        </Typography.Text>
                        <Input.TextArea
                            onChange={(e) => {
                                this.shipment.special = e.target.value;
                            }}
                        >

                        </Input.TextArea>
                    </div>
                    <div style={{display: "block"}}>
                        <Typography.Text strong={true} >
                            6. Chỉ dẫn người gửi khi không phát được bưu phẩm
                        </Typography.Text>
                        <div>
                            <Radio.Group
                                onChange={(e) => {
                                    this.shipment.guide = e.target.value;
                                }}
                            >
                                <Radio value={1}>Chuyển hoàn ngay</Radio>
                                <Radio value={2}>Chuyển hoàn trước ngày</Radio>
                                <Radio value={3}>Gọi điện cho người gưửi/BC gửi</Radio>
                                <Radio value={4}>Chuyển hoàn khi hết thời gian lưu trữ</Radio>
                                <Radio value={5}>Huỷ</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <Row align={"middle"}>
                        <Typography.Text strong={true} >
                            7. Khối lượng
                        </Typography.Text>
                        <div style={{ width: '8px' }}/>
                        <Space.Compact style={this.small ? { width: '100%' } : { width: '30%' }}>
                            <Input
                                placeholder="Khối lượng"
                                type={"number"}
                                onChange={(e) => {
                                    this.shipment.weight.value = Number(e.target.value);
                                }}
                            />
                            <Select defaultValue="kg"
                                    onChange={(e) => {
                                        this.shipment.weight.unit = e;
                                    }}
                            >
                                <Select.Option value="kg">kg</Select.Option>
                                <Select.Option value="g">g</Select.Option>
                            </Select>
                        </Space.Compact>
                    </Row>
                </Space>

                <SubmitButton
                    shipment={this.shipment}
                    parent={this}
                />

            </div>
        );
    }

    async onSubmit()  {
        console.log(this.shipment);
        await calcCharge(this.shipment);
        this.setState({
            page: 2,
        });
    }

    renderChargeInfo() {
        return (
            <div>
                <Typography.Title level={3}>Cước phí</Typography.Title>
                <div style={{
                    width: '50%',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}>
                    <ChargeTable
                        shipment={this.shipment}
                    />
                </div>

                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'right',
                    alignItems: 'center',
                    marginTop: '16px',
                }}>
                    <Button type={"primary"} size={"large"}
                            onClick={this.onConfirm.bind(this)}
                    >
                        Tạo đơn hàng
                    </Button>
                    <div style={{ width: '20%' }}/>
                </div>
            </div>
        );
    }

    onConfirm() {
        this.setState({
            page: 3,
        })
    }

    renderConfirmPayment() {
        return (
            <Page3
                shipment={this.shipment}
                onConfirm={this.onConfirm2.bind(this)}
            />
        );
    }

    async onConfirm2() {
        this.i = await onSubmit(this.shipment);
        this.setState({
            page: 4,
        })
    }

    renderComplete() {
        return (
            <div>
                <Typography.Title level={3} color={'green'}>Tạo đơn hàng thành công</Typography.Title>
                <Typography.Title level={5} color={'green'}>Mã đơn hàng là: {this.i}</Typography.Title>
            </div>
        );
    }

    render() {
        //console.log(this.shipment)
        switch (this.state.page) {
            case 1:
                return this.renderInfoPage();
            case 2:
                return this.renderChargeInfo();
            case 3:
                return this.renderConfirmPayment();
            case 4:
                return this.renderComplete();
            default:
                throw new Error('Unknown step');
        }
    }
}

function SubmitButton(props): React.FC {
    const onClick = () => {
        props.shipment.shipmentDate = new Date();
        console.log(props.shipment);
        const valid = props.shipment.checkValidSubmit();
        console.log(valid);
        if (!valid) {
            toast.error("Vui lòng điền đầy đủ thông tin.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
            })
        } else {
            toast.success("Điền thông tin thành công!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
            })
            props.parent.onSubmit();
        }
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            marginTop: '16px',
        }}>
            <Button type={"primary"} size={"large"}
                    onClick={onClick}
            >
                Tạo đơn hàng
            </Button>
            <div style={{ width: '20%' }}/>
        </div>
    );
}

function Page3(props): React.FC {
    const [paid, setPaid] = React.useState(false);

    const onCheck = (e:CheckboxChangeEvent) => {
        setPaid(e.target.checked);
    }

    return (
        <div>

            <Typography.Title level={3}>Xác nhận thanh toán</Typography.Title>

            <div style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: '16px',
                marginBottom: '16px',
            }}>
                <Checkbox onChange={onCheck}>
                    Người gửi thanh toán
                </Checkbox>

                <div style={{
                    width: '50%',
                    display: 'flex',
                    alignSelf: 'center',
                    justifySelf: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: '8px',
                    marginBottom: '8px',
                }}>
                    <Typography.Text strong={true} >
                        Tổng cước phí: {props.shipment.charge.total} VND
                    </Typography.Text>
                    <Typography.Text strong={true} >
                        Đã thanh toán:
                        <Space.Compact style={{ width: '50%', margin: '8px' }}>
                            <Input
                                placeholder="Trị giá"
                                type={"number"}
                                onChange={(e) => {
                                    const total = props.shipment.charge.total;
                                    let value = e.target.value;
                                    if(value < 0) {
                                        toast.warn("Số tiền thanh toán không được nhỏ hơn 0", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            progress: undefined,
                                            theme: "light",
                                        });
                                        value = 0;
                                    }
                                    if(value > total) {
                                        toast.warn("Số tiền thanh toán không được lớn hơn tổng cước phí", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            progress: undefined,
                                            theme: "light",
                                        });
                                    }
                                    props.shipment.receiverPay.total = total - value;
                                    if(total === value) {
                                        props.shipment.isReceiverPay = true;
                                    } else {
                                        props.shipment.isReceiverPay = false;
                                    }
                                }}
                                disabled={!paid}
                            />
                            <Select
                                defaultValue="VND"
                                onChange={(e) => {
                                }}
                                disabled={!paid}
                            >
                                <Select.Option value="VND">VND</Select.Option>
                                <Select.Option value="USD">USD</Select.Option>
                            </Select>
                        </Space.Compact>
                    </Typography.Text>
                </div>
            </div>

            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                marginTop: '16px',
            }}>
                <Button type={"primary"} size={"large"}
                        onClick={() => {
                            if(props.shipment.receiverPay.total < 0) {
                                toast.error("Khởi tạo đơn hàng thất bại!", {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                return;
                            }
                            toast.success("Khởi tạo đơn hàng thành công!", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                progress: undefined,
                                theme: "light",
                            });
                            props.onConfirm();
                        }}
                >
                    Tạo đơn hàng
                </Button>
                <div style={{ width: '20%' }}/>
            </div>
        </div>
    );
}

export default MakeShipment;