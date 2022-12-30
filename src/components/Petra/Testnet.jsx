import React from 'react';
import cl from "./Testnet.module.css";

const Testnet = () => {
    return (
        <div className={cl.testnet}>
            <div className={cl.testnet__box}>
                <div className={cl.testnet__text}
                >Please change network in Petra app to "Testnet"
                </div>
            </div>
        </div>
    )
};

export default Testnet;