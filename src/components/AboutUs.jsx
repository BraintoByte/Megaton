import { Switch } from "@tremor/react";
import logo from '../assets/images/atomic_bomb_1_logo.png'
import braintobytesLogo from '../assets/images/braintobytes_logo_1.png'
import React, { useState } from 'react';

const AboutUs = ({ isSwitchOn, setIsSwitchOn, version }) => {
    const handleSwitchChange = (value) => {
        setIsSwitchOn(value);
    };

    if (isSwitchOn == true && version) {
        return (
            <div className="container_about_us_1">
                <div className="flex items-center space-x-3 switch_main_1_about_us">
                    <Switch id="switch" name="switch" checked={isSwitchOn} onChange={handleSwitchChange} />
                    <label htmlFor="switch" className="text-sm text-white-1000 switch_2_text">
                        Close
                    </label>
                </div>
                <div className="images_about_us_1">
                    <img src={logo} alt="logo" className="logo_1_about_us" />
                    <img src={braintobytesLogo} alt="logo" className="logo_2_about_us" />
                </div>
                <div className="container_description_1_about_us">
                    <div className="description_1_about_us">
                        MEGATON v{ version }
                    </div>
                    <div className="description_2_about_us">
                        <div>
                            Check out our webpage
                            <a href="https://www.braintobytes.com/"> braintobytes </a>
                        </div>
                        <div>
                            💗👾 This is open source software and we love it that way! 👾💗
                        </div>
                        <div>
                            <div className="feedback_1_about_us">
                                ❤️ WE LOVE FEEDBACK! ❤️
                            </div>
                            <div className="feedback_2_about_us">
                                Please report any bugs or issues you find
                                <a href="https://github.com/BraintoByte/Megaton"> on our github page.</a>
                            </div>
                            <div className="feedback_1_about_us">
                                🧠🛸 HELP US GROW! 🛸🧠
                            </div>
                            <div className="feedback_2_about_us">
                                Fork the project and help us throw more code in the pot
                                <a href="https://github.com/BraintoByte/Megaton"> get it here!</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="license_1_about_us">
                    <div>
                    MEGATON © BrainToBytes
                    </div>
                    <a rel="license" href="https://github.com/BraintoByte/Megaton/blob/master/LICENSE">GNU General Public License v3.0</a>.
                </div>
            </div>
        )
    }
}

export default AboutUs