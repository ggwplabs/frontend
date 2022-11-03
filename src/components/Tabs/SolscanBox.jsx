import React from 'react';
import cl from "./SolscanBox.module.css";
import {ReactComponent as Arrow} from "../../images/Tabs/arrow.svg";
import {ReactComponent as Solscan} from "../../images/Tabs/solscan.svg";


const SolscanBox = () => {
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

export default SolscanBox;