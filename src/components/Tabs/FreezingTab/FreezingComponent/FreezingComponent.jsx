import React, {useEffect, useState} from 'react';
import cl from "../TabFreezing.module.css";
import {ReactComponent as GgIcon} from "../../../../images/Tabs/Wallet/GG_coin_icon.svg";
import {ReactComponent as Clock} from "../../../../images/Tabs/Freezing/clock.svg";
import {useInteract} from "../../../hooks/useInteract";
import FreezeService from "../../../../chain/FreezeService";
import RadioCards from "./RadioCards";
import Unfreez from "./Unfreez";
import GpassService from "../../../../chain/GpassService";
import Loader from "../../../UI/Loader/Loader";

const FreezingComponent = ({network, publicKey, createMessage, setIsMessageLoading, isMessageLoading}) => {

    const [balance, setBalance] = useState()
    const [freezedTime, setFreezedTime] = useState()
    const [lastGettingGpass, setLastGettingGpass] = useState()
    const [rewardPeriod, setRewardPeriod] = useState()

    const [gpassBalance, setGpassBalance] = useState()
    const [lastBurned, setLastBurned] = useState()

    const nextReward = lastGettingGpass + rewardPeriod*24*60*60;
    const nextRewardTimer = nextReward - Date.now()

    const [FreezingInfo, isFreezingInfoLoading, freezingInfoError] = useInteract(async () => {
        const info = await FreezeService.getInfo(network, publicKey)
        setBalance(info.amount)
        setFreezedTime(info.freezedTime)
        setLastGettingGpass(info.lastGettingGpass)
        setRewardPeriod(info.rewardPeriod)
    })

    const [getGpassBalance, isGetGpassBalanceLoading, gpassBalanceError] = useInteract(async () => {
        const wallet = await GpassService.getBalance(network, publicKey)

        setGpassBalance(Number(wallet.amount))
        setLastBurned(Number(wallet.lastBurned))
    })

    useEffect(() => {
        FreezingInfo()
        getGpassBalance()

    }, [publicKey,  isMessageLoading]);

    return (
        <div>
            {isFreezingInfoLoading
                ? <div className={cl.Loader_box}>
                    <Loader/>
                </div>
                : <div>
                    {balance === 0
                        ? <RadioCards
                            publicKey={publicKey}
                            create={createMessage}
                            setIsMessageLoading={setIsMessageLoading}
                            isMessageLoading={isMessageLoading}
                        />
                        : <Unfreez
                            publicKey={publicKey}
                            balance={balance}
                            nextReward={nextReward}
                            gpassBalance={gpassBalance}
                            lastBurned={lastBurned}
                            create={createMessage}
                            setIsMessageLoading={setIsMessageLoading}
                            isMessageLoading={isMessageLoading}
                        />
                    }
                </div>
            }
        </div>
    )

};

export default FreezingComponent;