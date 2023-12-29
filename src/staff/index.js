import React from "react";
import {ToastContainer} from "react-toastify";
import Login from "./src/Login";
import StaffFrame from "./src/StaffFrame";

export class Staff extends React.Component {
    state : {
        p:number,
        role:string
    } = {
        p: 0,
        role: "none"
    };

    onLoginComplete = (role: string) => {
        this.setState({p: 1, role});
    };

    onLogout = () => {
        this.setState({p: 0, role: "none"});
    };

    pages: any = (page: number, {role}) => {
        switch (page) {
            case 0:
                return <Login onLoginComplete={this.onLoginComplete.bind(this)}/>;
            case 1:
                return <StaffFrame role={role} onLogout={this.onLogout.bind(this)}/>;
            default:
                return <div>404</div>
        }
    };

    render() {
        return (
            <div>
                <ToastContainer/>
                {this.pages(this.state.p,{role: this.state.role})}
            </div>
        )
    }
}