import React from "react";
import "./Feature.css"
import {Form, Input, Spin} from 'antd';
import {showPopup} from "./popup/Popup";
import config from "./config.json";

const {URL} = config;

function getStyle(status) {
    switch (status) {
        case 'Pending':
            return {color: "red"};
        case 'Pre-Transit':
            return {color: "red"};
        case 'Gather-From':
            return {color: "red"};
        case 'In-Transit':
            return {color: "red"};
        case 'Gather-To':
            return {color: "red"};
        case 'Post-Transit':
            return {color: "red"};
        case 'Received':
            return {color: "red"};
        case 'Out for delivery':
            return {color: "red"};
        case 'Success':
            return {color: "green"};
        case 'Failed':
            return {color: "red"};
        case 'Returned':
            return {color: "red"};
        default:
            return {color: "red"};

    }
}

function Feature() {
    const [loading, setLoading] = React.useState(false);
    const onFinish = async (values) => {
        setLoading(true);
        await fetch(URL + "/customer/tracking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: values.id
            })
        }).then(
            (res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error("Error");
                }
            }
        ).then(
            (res) => {
                const data = res.data[0];
                setLoading(false);
                showPopup((
                    <div>
                        <h1>Order Tracking</h1>
                        <div className={"feature-warpper2"}>
                            <div className={"feature-info"}>
                                <p>Order ID: {values.id}</p>
                                <p>Order Status: <span style={getStyle(data.status[data.status.length -1])}>{data.status[data.status.length -1]}</span></p>
                                <p>Order Date: {data.shipmentDate}</p>
                                <p>Order Address: {data.receiverInfo.address}</p>
                            </div>
                            <div className={"feature-content"}>
                                <p>Progress: </p>
                                <div className={"feature-progress"}>
                                    <ul>
                                        {res.status.map((item) => {
                                            return (
                                                <li>
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        ).catch(
            (err) => {
                setLoading(false);
                showPopup((
                    <div>
                        <h1>Order Tracking</h1>
                        <div className={"feature-warpper2"}>
                            <p>Order Status: <span style={{color: "red"}}>Not Found</span></p>
                        </div>
                    </div>
                ))
            }
        )
      };

    return (
        <Spin spinning={loading}>
            <section className={"feature-wrapper"}>
                <div className={"feature-container innerWidth paddings"}>
                    <h1>Order Tracking</h1>
                    <div>
                        <Form
                            className={"flexStart track-bar"}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                style={{width: "100%"}}
                                name="id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your track number!',
                                    },
                                ]}
                            >
                                <Input className={"input"} placeholder={"Enter the order code you need to look up"} size={"large"}/>
                            </Form.Item>
                            <Form.Item style={{width: "25%"}}>
                                <button className={"feature-button"}>Track</button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </Spin>
    )
}

export default Feature;