import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import {MdOutlineArrowDropDown} from "react-icons/md";
import "./About.css";
import data from "./utils/accordion";


function About() {
    return (
        <section className={"about-wrapper"}>
            <div className={"about-container paddings innerWidth flexCenter"}>
                {/*left side*/}
                <div className={"about-left"}>
                    <div className={"image-container"}>
                        <img src={"./about-image.avif"} alt={"about"}/>
                    </div>
                </div>

                {/*right side*/}
                <div className={"about-right flexColStart"}>
                    <span className={"orangeText"}>About Us</span>
                    <span className={"primaryText"}>Value We Give To You</span>
                    <span className={"secondaryText"}>
                        We are always ready to help by providing the best services to you.
                        <br/>
                        We believe that our service will bring all parts of the country closer together.
                    </span>

                    <Accordion className={"accordion"}
                    allowMultipleExpanded={false}
                    preExpanded={[0]}
                    >
                        {
                            data.map((item, i) => {
                                return (
                                    <AccordionItem className={"accordionItem"} key={i} uuid={i}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton className={"accordionButton flexCenter"}>
                                                <div className={"flexCenter icon"}>{item.icon}</div>
                                                <span className={"primaryText"}>{item.heading}</span>
                                                <div className={"flexCenter icon"}>
                                                    <MdOutlineArrowDropDown size={20}/>
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>

                                        <AccordionItemPanel>
                                            <p className={"secondaryText"}>{item.detail}</p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                )
                            })
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    )
}

export default About;