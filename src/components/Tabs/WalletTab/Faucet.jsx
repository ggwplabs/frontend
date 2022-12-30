import React from 'react';
import cl from './Faucet.module.css'
import InterButton from "../../UI/Buttons/InterButton";

const Faucet = ({isAirdropLoading, createMessage}) => {
    return (
        <div className={cl.Faucet_box}>
            <div className={cl.Label}>FAUCET</div>
            <div>
                <div className={cl.Text}>
                </div>
                <div className={cl.Inter_box}>
                    <InterButton
                        disabled={isAirdropLoading}
                        onClick={createMessage}
                    >
                        Airdrop
                    </InterButton>
                </div>
            </div>
        </div>
    );
};

export default Faucet;