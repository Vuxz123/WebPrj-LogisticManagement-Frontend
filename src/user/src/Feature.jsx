import React from "react";
import "./Feature.css"
import { Input } from 'antd';

function Feature() {
    return (
        <section className={"feature-wrapper"}>
            <div className={"feature-container innerWidth paddings"}>
                <h1>Order Tracking</h1>
                <div className={"flexStart track-bar"}>
                    <Input className={"input"} placeholder={"Enter the order code you need to look up"} size={"large"}/>
                    <button className={"feature-button"}>Track</button>
                </div>
            </div>
        </section>
    )
}

export default Feature;