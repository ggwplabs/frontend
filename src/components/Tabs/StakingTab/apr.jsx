import React, {useEffect, useState} from 'react';
import cl from "./apr.module.css";
import {ReactComponent as GgIcon} from "../../../images/Tabs/Wallet/GG_coin_icon.svg";
import Staked from "./Staked";
import StakeService from "../../../chain/StakeService";

const Apr = ({info, setIsMessageLoading, isMessageLoading, create}) => {
    const Actualepoch = 1 + (((Date.now() / 1000 | 0) - info.startTime) / (info.epochPeriodDays * 86400)  | 0);

    const getEpochByTime = (start, now, period) => {
        const spentTime = now - start;
        const spentDays = (spentTime / (24 * 60 * 60)) | 0
        const epoch = spentDays / period;
        let isFullEpoch;
        if ((spentTime % (period * 24 * 60 * 60)) === 0) {
            isFullEpoch = true
        } else {
            isFullEpoch = false
        }
        return [(epoch | 0) + 1, isFullEpoch]
    }

    const calcUserPastEpoch = (start, stake, now, period) => {
        let [startEpoch, isStartEpochFull] = getEpochByTime(start, stake, period)
        let [endEpoch, isEndEpochFull] = getEpochByTime(start, now, period)
        if (isStartEpochFull === false) {
            startEpoch += 1
        }
        return ([startEpoch, endEpoch])
    }

    const getAprByEpoch = (epoch, startApr, stepApr, endApr) => {
        const currentApr = startApr - (stepApr * (epoch - 1))
        return currentApr < endApr ? endApr : currentApr
    }

    const calcReawards = () => {
        const [startEpoch, endEpoch] = calcUserPastEpoch(info.startTime, info.stakeTime, (Date.now() / 1000 | 0), info.epochPeriodDays)
        if ((endEpoch - startEpoch) === 0) {
            return 0
        }
        let newAmount = info.amount / (10 ** 8);
        for (let i = startEpoch; i < endEpoch; i++) {

            const currentApr = getAprByEpoch(i, info.aprStart, info.aprStep, info.aprEnd) / 100
            const tmp = ((1 + currentApr / 365) ** info.epochPeriodDays)
            newAmount = newAmount * tmp
        }
        const reward = newAmount - info.amount / (10 ** 8)
        return reward
    }

    const unstake = async () => {
        setIsMessageLoading(true)
        try {
            const tx = await StakeService.withdraw()
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
                            GGWP Staked:
                        </div>
                        <div className={cl.Balance__amount}>
                            <div>{Number(info.amount / (10 ** 8)).toLocaleString('ru-RU')}</div>
                        </div>
                        <div className={cl.Balance__icon}>
                            <GgIcon/>
                        </div>
                    </div>
                    <div className={cl.Time}>
                        <div>
                            Epoch {Actualepoch} started
                            at: {new Date((info.startTime + (info.epochPeriodDays * 86400 * (Actualepoch - 1))) * 1000).toLocaleDateString("en-US")}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={unstake}
                            disabled={isMessageLoading}
                            className={cl.Unfreeze_button}
                        >
                            unstake
                        </button>
                    </div>
                </div>
                <div className={cl.Rewards_box}>
                    <Staked
                        balance={calcReawards().toFixed(5)}
                        start={info.startTime + (info.epochPeriodDays * 86400 * (Actualepoch))}
                        apr={getAprByEpoch(Actualepoch, info.aprStart, info.aprStep, info.aprEnd)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Apr;