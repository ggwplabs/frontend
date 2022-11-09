import React from 'react';
import cl from "./Unfreez.module.css";
import {ReactComponent as GgIcon} from "../../../../images/Tabs/Wallet/GG_coin_icon.svg";
import {ReactComponent as Clock} from "../../../../images/Tabs/Freezing/clock.svg";
import {ReactComponent as Burn} from "../../../../images/Tabs/Freezing/burn.svg";
import {ReactComponent as Gpass} from '../../../../images/Tabs/g_pass_logo.svg'
import FreezeService from "../../../../chain/FreezeService";
import InterButton from "../../../UI/Buttons/InterButton";
import GpassBalance from "../../WalletTab/GpassBalance";

const Unfreez = ({
                     publicKey,
                     setIsMessageLoading,
                     isMessageLoading,
                     create,
                     balance,
                     nextReward,
                     gpassBalance,
                     lastBurned
                 }) => {

    const unfreeze = async () => {
        setIsMessageLoading(true)
        try {
            const tx = await FreezeService.unfreeze('devnet', publicKey)
            create({id: Date.now(), error: false, text: tx})
        } catch (e) {
            create({id: Date.now(), error: true, text: e.message})
        } finally {
            setIsMessageLoading(false)
        }
    }

    const getReward = async () => {
        setIsMessageLoading(true)
        try {
            const tx = await FreezeService.withdrawGpass('devnet', publicKey)
            create({id: Date.now(), error: false, text: tx})
        } catch (e) {
            create({id: Date.now(), error: true, text: e.message})
        } finally {
            setIsMessageLoading(false)
        }
    }

    const nextRewardTimerH = parseInt((nextReward - Date.now()/1000) / 3600)
    // console.log(nextRewardTimerH)

    console.log( (new Date(nextReward) - Date.now() / 1000))


    // console.log(Date.now())
    const nextRewardTimerM = (nextReward - Date.now() - nextRewardTimerH) - nextRewardTimerH
    const nextRewardTimerS = (nextReward - Date.now()) / 3600

    // const accumGpass =

    return (
        <div>
            <div className={cl.Frozen}>
                <div className={cl.Ggwp_frozen}>
                    <div className={cl.Frozen_balance}>
                        <div className={cl.Balance__text}>
                            GGWP Frozen:
                        </div>
                        <div className={cl.Balance__amount}>
                            <div>{balance}</div>
                        </div>
                        <div className={cl.Balance__icon}>
                            <GgIcon/>
                        </div>
                    </div>
                    <div className={cl.Time}>
                        <div>
                            Your next reward {new Date(nextReward * 1000).toLocaleDateString("en-US")} at: {new Date(nextReward).toLocaleTimeString("en-US")}
                        </div>
                        <div className={cl.Clock}>
                            <Clock/>
                            <div className={cl.Time__elem}>h: 2</div>
                            <div className={cl.Time__border}>min:45</div>
                            <div className={cl.Time__elem}>sec: 59</div>
                        </div>

                    </div>
                    <div>
                        <button
                            onClick={unfreeze}
                            disabled={isMessageLoading}
                            className={cl.Unfreeze_button}
                        >
                            unfreeze
                        </button>
                    </div>
                </div>
                <div className={cl.Rewards_box}>
                   <GpassBalance
                       gpassBalance={gpassBalance}
                   />
                    <div className={cl.Get_reward}>
                        <div className={cl.Accum_rewards}>
                            <div className={cl.Accum_rewards_text}>Accumulated reward </div>
                            <div className={cl.Accum_rewards_amount}>0 GPASS</div>
                        </div>
                        <InterButton
                            onClick={getReward}
                            disabled={isMessageLoading}
                        >
                            get reward
                        </InterButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unfreez;