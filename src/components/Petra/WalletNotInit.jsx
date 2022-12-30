import React from 'react';
import cl from "./WalletNotInit.module.css";

const WalletNotInit = () => {
    return (
        <div className={cl.testnet}>
            <div className={cl.testnet__box}>
                <div className={cl.testnet__text}
                >Your wallet is not init, use the faucet in Petra, please
                </div>
            </div>
        </div>
    );
};

export default WalletNotInit;