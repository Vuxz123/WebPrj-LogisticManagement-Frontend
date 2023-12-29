import React from "react";
import "./Popup.css";

let temp = null;

class Popup extends React.Component {
    state = {
        showPopup: false
    };

    componentDidMount() {
        temp = this.showPopup.bind(this);
    }

    child: React.ReactNode = {};

    showPopup(child: React.ReactNode) {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.child = child;
        this.#togglePopup();
    }

    #togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    #closePopup() {
        this.setState({
            showPopup: false
        });
    }

    #renderPopup() {
        return this.state.showPopup ? (
            this.state.child
        ) : <> </>;
    }

    render() {
        console.log(this.state.child)
        return (
            <div>
                <div id={"popup-background"} className={this.state.showPopup ? "background is-active" : "background"} onClick={this.#closePopup.bind(this)}/>
                <div id={"popup-container"} className={this.state.showPopup ? "container is-active" : "container"}>
                    <div className={"popup"}>
                        {this.#renderPopup()}
                        <Button onClick={this.#closePopup.bind(this)}/>
                    </div>
                </div>
            </div>
        );
    }
}

const Button = ({onClick}) => {
    return (
        <button
            type="button"
            className={"popup-button"}
            onClick={onClick}
        >
            <svg
                viewBox="0 0 30 30"
                fill="none"
                stroke="black"
                stroke-width="2"
            >
                <line x1="5" y1="5" x2="25" y2="25" />
                <line x1="5" y1="25" x2="25" y2="5" />
            </svg>
        </button>
    );
};

const PopupInstance = <Popup/>;

function showPopup(child: React.ReactNode) {
    temp(child);
}

export {PopupInstance, Popup, showPopup};