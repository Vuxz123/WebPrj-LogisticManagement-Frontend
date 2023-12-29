import React from "react";
import "./Navbar.css"
import {Anchor} from "antd";

function Navbar() {
   return (
        <section className={"navbar-wrapper"}>
            <div className={"flexCenter paddings innerWidth navbar-container"}>
                <img src={"./logo.png"} alt={"logo"} width={200} height={100} style={{objectFit: "contain"}}/>
                <div className={"flexCenter menu"}>
                    <Anchor
                        items={[
                            {
                                title: "Feature",
                                href: "#feature"
                            },
                            {
                                title: "About",
                                href: "#about"
                            },
                            {
                                title: "Contact",
                                href: "#contact"
                            }
                        ]}
                        direction={"horizontal"}
                    />
                </div>
            </div>
        </section>
    )
}

export default Navbar;