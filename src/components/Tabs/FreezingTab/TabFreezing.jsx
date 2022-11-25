import React, {useEffect, useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import FreezeService from "../../../chain/FreezeService";
import SolscanBox from "../SolscanBox";
import cl from './TabFreezing.module.css'
import MessagesList from "../../MessageList/MessagesList";
import FreezingComponent from "./FreezingComponent/FreezingComponent";
import GpassService from "../../../chain/GpassService";
import GpassBalance from "./FreezingComponent/GpassBalance";


const TabFreezing = ({publicKey}) => {
    const network = 'devnet'
    const [messages, setMessages] = useState([])
    const [isMessageLoading, setIsMessageLoading] = useState(false)
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

    const [frozenBalance, setFrozenBalance] = useState()
    const [lastGettingGpass, setLastGettingGpass] = useState()
    const [rewardPeriod, setRewardPeriod] = useState()
    const [gpassBalance, setGpassBalance] = useState()
    const [willBurn, setWillBurn] = useState()

    const [getInfo, isInfoLoading, getInfoError] = useInteract(async () => {
        const gpassInfo = await GpassService.getInfo(network, publicKey)
        const freezingInfo = await FreezeService.getInfo(network, publicKey)

        await setWillBurn((Number(gpassInfo.lastBurned) + Number(gpassInfo.burnPeriod)));
        await setFrozenBalance(freezingInfo.amount)
        await setLastGettingGpass(freezingInfo.lastGettingGpass)
        await setRewardPeriod(freezingInfo.rewardPeriod)
        await setGpassBalance(Number(gpassInfo.amount))
    })

    useEffect(() => {
        getInfo()

    }, [publicKey, isMessageLoading]);

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
                    {(gpassBalance > 0 && frozenBalance === 0 && !isInfoLoading && (willBurn - (Date.now() / 1000)) > 0)
                        ? <GpassBalance
                            gpassBalance={gpassBalance}
                            willBurn={willBurn}
                        />
                        : <div></div>
                    }
                </div>
            </div>
            <FreezingComponent
                publicKey={publicKey}
                createMessage={createMessage}
                setIsMessageLoading={setIsMessageLoading}
                isMessageLoading={isMessageLoading}
                isLoadingInfo={isInfoLoading}
                frozenBalance={frozenBalance}
                gpassBalance={gpassBalance}
                willBurn={willBurn}
                lastGettingGpass={lastGettingGpass}
                rewardPeriod={rewardPeriod}
            />
            <div className={cl.Info}>
                <h1>TOKENS CAN BE UNFROZEN ACCORDING TO THE FOLLOWING</h1>
                <ol>
                    <li>Instantly, with 15% of Royalty retention of the frozen GGWP amount.</li>
                    <li>In 15 days, with no Royalty retained.</li>
                </ol>
            </div>
            <SolscanBox/>
        </div>
    )
}

export default TabFreezing;