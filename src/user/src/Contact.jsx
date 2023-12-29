import React from "react";
import "./Contact.css";
import {MdCall} from 'react-icons/md';
import {BsFillChatDotsFill} from "react-icons/bs";
import {HiChatBubbleBottomCenter} from "react-icons/hi2";

function Contact() {
    return (
        <section className={"contact-wrapper"}>
            <div className={"contact-container paddings innerWidth flexCenter"}>
                {/*left side*/}
                <div className={"flexColStart contact-left"}>
                    <span className={"orangeText"}>Our Contact Us</span>
                    <span className={"primaryText"}>Easy to contact us</span>
                    <span className={"secondaryText"}>We are always ready to help by providing the best services to you. We believe that our service will bring all parts of the country closer together.</span>

                    <div className={"flexColStart contactModes"}>
                        {/*first row*/}
                        <div className={"flexStart row"}>
                            <div className={"flexColCenter mode"}>
                                <div className={"flexStart"}>
                                    <div className={"flexCenter icon"}>
                                        <MdCall size={"25"}/>
                                    </div>

                                    <div className={"flexColStart detail"}>
                                        <span className={"primaryText"}>Call</span>
                                        <span className={"secondaryText"}>036 5081772</span>
                                    </div>
                                </div>

                                <div className={"flexCenter button"}>Call now</div>
                            </div>

                            <div className={"flexColCenter mode"}>
                                <div className={"flexStart"}>
                                    <div className={"flexCenter icon"}>
                                        <HiChatBubbleBottomCenter size={"25"}/>
                                    </div>

                                    <div className={"flexColStart detail"}>
                                        <span className={"primaryText"}>Email</span>
                                        <span className={"secondaryText"}>riooog253@gmail.com</span>
                                    </div>
                                </div>

                                <div className={"flexCenter button"}>Mail now</div>
                            </div>
                        </div>

                        {/*second row*/}
                        <div className={"flexStart row"}>
                            <div className={"flexColCenter mode"}>
                                <div className={"flexStart"}>
                                    <div className={"flexCenter icon"}>
                                        <HiChatBubbleBottomCenter size={"25"}/>
                                    </div>

                                    <div className={"flexColStart detail"}>
                                        <span className={"primaryText"}>Message</span>
                                        <span className={"secondaryText"}>036 5081772</span>
                                    </div>
                                </div>

                                <div className={"flexCenter button"}>Message now</div>
                            </div>

                            <div className={"flexColCenter mode"}>
                                <div className={"flexStart"}>
                                    <div className={"flexCenter icon"}>
                                        <BsFillChatDotsFill size={"25"}/>
                                    </div>

                                    <div className={"flexColStart detail"}>
                                        <span className={"primaryText"}>Zalo</span>
                                        <span className={"secondaryText"}>036 5081772</span>
                                    </div>
                                </div>

                                <div className={"flexCenter button"}>Message now</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*right side*/}
                <div className={"contact-right"}>
                    <div className={"image-container"}>
                        <img src={"./contact-image.jpeg"} alt={"contact"}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact;