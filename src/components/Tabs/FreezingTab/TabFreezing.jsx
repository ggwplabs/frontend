import React, {useEffect, useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import FreezeService from "../../../chain/FreezeService";
import AptosBox from "../aptosBox";
import cl from './TabFreezing.module.css'
import MessagesList from "../../MessageList/MessagesList";
import FreezingComponent from "./FreezingComponent/FreezingComponent";
import GpassBalance from "./FreezingComponent/GpassBalance";


const TabFreezing = ({wallet}) => {
    const [messages, setMessages] = useState([])
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    const [coreInfo, setCoreInfo] = useState(NaN)
    const [chainInfo, setChainInfo] = useState(NaN)
    const [timeOutFlag, setTimeOutFlag] = useState(false)

    const calcReadyToClaim = (time, lastBurned, burnPeriod, lastGetingReward, rewardPeriod, reward) => {
        const numBurned = (time - lastBurned) / burnPeriod | 0
        const lastMustBurn = lastBurned + numBurned * burnPeriod
        if (lastGetingReward > lastMustBurn) {
            return reward * (((time - lastGetingReward)) / rewardPeriod | 0)
        } else {
            return reward * (((time - lastMustBurn)) / rewardPeriod | 0)
        }
    }

    const calcNextReward = (time, lastGettingGpass, rewardPeriod) => {
        if ((time - lastGettingGpass) < rewardPeriod) {
            return rewardPeriod - (time - lastGettingGpass)
        } else {
            return rewardPeriod - ((time - lastGettingGpass) % rewardPeriod)
        }
    }

    const calcNextBurn = (time, lastBurned, burnPeriod) => {
        if ((time - lastBurned) < burnPeriod) {
            return burnPeriod - (time - lastBurned)
        } else {
            return burnPeriod - ((time - lastBurned) % burnPeriod)
        }
    }

    const calcCoreInfo = () => {
        const time = Date.now() / 1000 | 0
        let reward = 0;
        if (chainInfo.frozenBalance >= 1000 && chainInfo.frozenBalance < 2000) {
            reward = 5;
        }
        if (chainInfo.frozenBalance >= 2000 && chainInfo.frozenBalance < 3000) {
            reward = 10;
        }
        if (chainInfo.frozenBalance >= 3000 && chainInfo.frozenBalance < 4000) {
            reward = 15;
        }
        if (chainInfo.frozenBalance >= 4000 && chainInfo.frozenBalance < 4800) {
            reward = 20;
        }
        if (chainInfo.frozenBalance >= 4800) {
            reward = 25;
        }

        return {
            frozenBalance: chainInfo.frozenBalance,
            gpassBalance: chainInfo.lastBurned + chainInfo.burnPeriod < time ? 0 : chainInfo.gpassBalance,
            willBurn: calcNextBurn(time, chainInfo.lastBurned, chainInfo.burnPeriod),
            nextReward: calcNextReward(time, chainInfo.lastGettingGpass, chainInfo.rewardPeriod),
            readyToClaim: calcReadyToClaim(time, chainInfo.lastBurned, chainInfo.burnPeriod, chainInfo.lastGettingGpass, chainInfo.rewardPeriod, reward),
        }
    }

    const [getInfo, isInfoLoading, getInfoError] = useInteract(async () => {
        const info = await FreezeService.getInfo(wallet)
        await setChainInfo(info)
    })
    useEffect(() => {
        getInfo()
    }, [wallet, isMessageLoading]);

    useEffect(() => {
        setCoreInfo(() => calcCoreInfo());
        setTimeOutFlag(false)
    }, [chainInfo, timeOutFlag]);

    const removeMessage = (id) => {
        setMessages(messages.filter(message => message.id !== id))
    }

    const createMessage = async (message) => {
        if (messages.length < 5) {
            setMessages([message, ...messages])
        } else {
            setMessages([message, ...messages.splice(0, 4)])
        }
    }

    const elem = (coreInfo.gpassBalance > 0 && coreInfo.frozenBalance === 0 && !isInfoLoading && coreInfo.willBurn > 0)
        ? <GpassBalance
            info={coreInfo}
        />
        : <div></div>

    return (
        <div>
            <MessagesList
                messages={messages}
                remove={removeMessage}
                isLoading={isMessageLoading}
            />
            <div className={cl.Gpass_info}>
                <div className={cl.Text}>
                    An entry to a game regardless of the result of the game
                    ( winning/losing/early exit/connection drop )
                    leads to automatic burning of 1 GPASS.
                    <p>Losing does not lead to extra burning of tokens.</p>
                </div>
                <div className={cl.loader}>
                    {elem}
                </div>
            </div>
            <FreezingComponent
                createMessage={createMessage}
                setIsMessageLoading={setIsMessageLoading}
                isMessageLoading={isMessageLoading}
                isLoadingInfo={isInfoLoading}
                info={coreInfo}
                calc={setTimeOutFlag}
            />
            <div className={cl.Info}>
                <h1>TOKENS CAN BE UNFROZEN ACCORDING TO THE FOLLOWING</h1>
                <ol>
                    <li>Instantly, with 15% of Royalty retention of the frozen GGWP amount.</li>
                    <li>In 15 days, with no Royalty retained.</li>
                </ol>
            </div>
            <AptosBox/>
        </div>
    )
}

export default TabFreezing;