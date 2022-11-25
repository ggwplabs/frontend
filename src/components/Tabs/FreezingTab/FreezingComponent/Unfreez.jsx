import React, {useEffect, useState} from 'react';
import cl from "./Unfreez.module.css";
import {ReactComponent as GgIcon} from "../../../../images/Tabs/Wallet/GG_coin_icon.svg";
import {ReactComponent as Clock} from "../../../../images/Tabs/Freezing/clock.svg";
import FreezeService from "../../../../chain/FreezeService";
import InterButton from "../../../UI/Buttons/InterButton";
import GpassBalance from "./GpassBalance";

const Unfreez = ({
                     publicKey,
                     setIsMessageLoading,
                     isMessageLoading,
                     create,
                     frozenBalance,
                     gpassBalance,
                     willBurn,
                     lastGettingGpass,
                     rewardPeriod,
                     items
                 }) => {

    const [accGpass, setAccGpass] = useState()
    const [nextRewardTime, setNextRewardTime] = useState()
    const [time, setTime] = useState()

    const calcReawards = () =>{
        const cnt = Math.floor((Math.floor(Date.now() / 1000) - lastGettingGpass) / rewardPeriod)
        const reward = items.filter(item => item.ggwp <= frozenBalance).pop()
        if (reward) {
            setAccGpass(reward.gpass * cnt)
        }
        const time = lastGettingGpass + rewardPeriod * (cnt + 1)
        setTime(time - Math.floor(Date.now() / 1000))
        setNextRewardTime(time)
    }

    useEffect( () => {
        calcReawards()
    }, [lastGettingGpass])

    useEffect(() => {
        const interval = setInterval( () => {
            setTime((time) => time >= 1 ? time - 1 : 0);
        }, 999)
    }, [])

    const hours = Math.floor(time / 3600)
    const min = Math.floor((time % 3600) / 60)
    const sec = (time % 3600) % 60


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

    return (
        <div>
            <div className={cl.Frozen}>
                <div className={cl.Ggwp_frozen}>
                    <div className={cl.Frozen_balance}>
                        <div className={cl.Balance__text}>
                            GGWP Frozen:
                        </div>
                        <div className={cl.Balance__amount}>
                            <div>{Number(frozenBalance).toLocaleString('ru-RU')}</div>
                        </div>
                        <div className={cl.Balance__icon}>
                            <GgIcon/>
                        </div>
                    </div>
                    <div className={cl.Time}>
                        <div>
                            Your next reward {new Date(nextRewardTime * 1000).toLocaleDateString("en-US")} at: {new Date(nextRewardTime * 1000).toLocaleTimeString("en-US")}
                        </div>
                        <div className={cl.Clock}>
                            <Clock/>
                            <div className={cl.Time__elem}>h: {hours}</div>
                            <div className={cl.Time__border}>min: {min}</div>
                            <div className={cl.Time__elem}>sec: {sec}</div>
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
                       willBurn={willBurn}
                   />
                    <div className={cl.Get_reward}>
                        <div className={cl.Accum_rewards}>
                            <div className={cl.Accum_rewards_text}>Redy to claim </div>
                            <div className={cl.Accum_rewards_amount}>{accGpass} GPASS</div>
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