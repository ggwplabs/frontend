import React from 'react';
import cl from './Faucet.module.css'
import InterButton from "../../UI/Buttons/InterButton";

const Faucet = ({setAmount, isAirdropLoading, createMessage}) => {
    return (
        <div className={cl.Faucet_box}>
            <div className={cl.Label}>FAUCET</div>
            <div>
                <div className={cl.Text}>
                    Enter amount GGWP
                </div>
                <div className={cl.Inter_box}>
                    <input
                        className={cl.Input}
                        type='text'
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Maximum 3000 GGWP"
                    />
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