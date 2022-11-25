import React, {useState} from 'react';
import InterButton from "../../UI/Buttons/InterButton";
import cl from './Staking.module.css'
import StakeService from "../../../chain/StakeService";

const Staking = ({publicKey, isLoading, setIsLoading, createMessage, minStakeAmount}) => {
    const [amount, setAmount] = useState()

    const stake = async () => {
        setIsLoading(true)
        try {
            const tx = await StakeService.stake('devnet', publicKey, amount)
            createMessage({id: Date.now(), error: false, text: tx})
        } catch (e) {
            createMessage({id: Date.now(), error: true, text: e.message})
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cl.Faucet_box}>
            <div className={cl.Label}>STAKING</div>
            <div>
                <div className={cl.Text}>
                    Enter amount GGWP
                </div>
                <div className={cl.Inter_box}>
                    <input
                        className={cl.Input}
                        type='text'
                        onChange={e => setAmount(e.target.value)}
                        placeholder={"Minimum " + minStakeAmount / (10**9) + " GGWP"}
                    />
                    <InterButton
                        disabled={isLoading}
                        onClick={stake}
                    >
                        Stake
                    </InterButton>
                </div>
            </div>
        </div>
    );
};

export default Staking;