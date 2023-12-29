import React from "react";
import "./Header.css";

function Header() {
    return (
        <section className={"header-wrapper"}>
            <div className={"paddings flexCenter innerWidth header-container"}>
                {/*left side*/}
                <div className={"flexColStart header-left"}>
                    <div className={"header-title"}>
                        <div className={"orange-circle"}/>
                        <h1>
                            Fast <br/>
                            Convenient <br/>
                            Reliable
                        </h1>
                    </div>

                    <div className={"flexColStart header-des"}>
                        <span className={"secondaryText"}>Empowering commerce globally, our logistics pave paths for myriad possibilities.</span>
                        <span className={"secondaryText"}>Bridging distances, we unlock diverse opportunities with seamless logistics solutions.</span>
                    </div>

                    <div className={"flexCenter stats"}>
                        <div className={"flexColCenter stat"}>
                            <span>
                                <span>63</span>
                                <span>+</span>
                            </span>
                            <span className={"secondaryText"}>Covering Cities</span>
                        </div>

                        <div className={"flexColCenter stat"}>
                            <span>
                                <span>800</span>
                                <span>+</span>
                            </span>
                            <span className={"secondaryText"}>Depot Nationwide</span>
                        </div>

                        <div className={"flexColCenter stat"}>
                            <span>
                                <span>1M</span>
                                <span>+</span>
                            </span>
                            <span className={"secondaryText"}>Trusted Customers</span>
                        </div>
                    </div>
                </div>

                {/*right side*/}
                <div className={"flexCenter header-right"}>
                    <div className={"image-container"}>
                        <img src={"./header-img.png"} alt={"header-image"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header;