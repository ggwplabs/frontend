import React from 'react';
import cl from './Faucet.module.css'

const Faucet = ({setAmount, isAirdropLoading, createMessage}) => {
    return (
        <div className={cl.Faucet_box}>
            <div className={cl.Label}>FAUCET</div>
            <div>
                <div className={cl.Text}>
                    Enter amount GGWP
                </div>
                <input
                    className={cl.Input}
                    type='text'
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Maximum 3000 GGWP"
                />
                <button
                    className={cl.Button}
                    disabled={isAirdropLoading}
                    onClick={createMessage}
                >
                    Airdrop
                </button>
            </div>
        </div>
    );
};

export default Faucet;