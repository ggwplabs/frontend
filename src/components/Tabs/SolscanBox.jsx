import React from 'react';
import cl from "./Solscan.module.css";
import {ReactComponent as Arrow} from "../../images/Tabs/arrow.svg";

const Solscan = () => {
    return (
        <div className={cl.Solscan}>
            <Solscan/>
            <a href='#'>
                more info about GGWP token
            </a>
            <Arrow/>
        </div>
    );
};

export default Solscan;