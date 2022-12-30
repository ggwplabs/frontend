import React from 'react';
import cl from "./aptosBox.module.css";
import {ReactComponent as Arrow} from "../../images/Tabs/arrow.svg";
import {ReactComponent as Aptos} from "../../images/Tabs/aptos.svg";

const AptosBox = () => {
    return (
        <div className={cl.Solscan}>
            <Aptos/>
            <a href='https://explorer.aptoslabs.com/account/57de268d237c952d9598180e90c751f1d5831358bf644d8750f455310961d86f'
               target={"_blank"}
            >
                more info about GGWP token
            </a>
            <Arrow/>
        </div>
    );
};

export default AptosBox;