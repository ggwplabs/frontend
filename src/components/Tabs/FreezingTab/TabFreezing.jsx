import React, {useEffect, useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import FreezeService from "../../../chain/FreezeService";
import Loader from "../../UI/Loader/Loader";
import SolscanBox from "../SolscanBox";
import cl from './TabFreezing.module.css'
import RadioCards from "./RadioCards";
import MessagesList from "../../MessageList/MessagesList";
import {ReactComponent as GgIcon} from "../../../images/Tabs/Wallet/GG_coin_icon.svg";


const TabFreezing = ({publicKey}) => {
    const network = 'devnet'
    const [messages, setMessages] = useState([])
    const [balance, setBalance] = useState()
    const [freezedTime, setFreezedTime] = useState()
    const [lastGettingGpass, setastGettingGpass] = useState()
    const [freezingTX, setFreezingTX] = useState(NaN)
    const [amount, setAmount] = useState(0)
    const [isFreezingLoading, setIsFreezingLoading] = useState(false)
    const [FreezingInfo, isFreezingInfoLoading, freezingInfoError] = useInteract(async () => {
        const info = await FreezeService.getInfo(network, publicKey)
        setBalance(info.amount)
        setFreezedTime(info.freezedTime)
        setastGettingGpass(info.lastGettingGpass)
    })

    useEffect(() => {
        FreezingInfo()

    }, [publicKey, isFreezingLoading]);

    const removeMessage = (id) => {
        setMessages(messages.filter(message => message.id !== id))
    }

    const createMessage = async () => {
        let message;
        setIsFreezingLoading(true)
        try {
            const tx = await FreezeService.freezing(network, publicKey, amount)
            message = {id: Date.now(), error: false, text: tx}
        } catch (e) {
            message = {id: Date.now(), error: true, text: e.message}
        } finally {
            if (messages.length < 5) {
                setMessages([message, ...messages])
            } else {
                setMessages([message, ...messages.splice(0, 4)])
            }
            setIsFreezingLoading(false)
        }
    }

    return (
        <div>
            <MessagesList
                messages={messages}
                remove={removeMessage}
                isLoading={isFreezingLoading}
            />
            <div className={cl.Gpass_info}>
                <div className={cl.Text}>
                    An entry to a game regardless of the result of the game
                    ( winning/losing/early exit/connection drop )
                    leads to automatic burning of 1 GPASS.cl.Button
                    <p>Losing does not lead to extra burning of tokens.</p>
                </div>
                <div className={cl.loader}>
                    block 1.2
                </div>
            </div>
            <div>
                {/*<div className={cl.Frozen}>*/}
                {/*    <div className={cl.Ggwp_frozen}>*/}
                {/*        <div className={cl.Frozen_balance}>*/}
                {/*            <div className={cl.Balance__text}>*/}
                {/*                GGWP Frozen:*/}
                {/*            </div>*/}
                {/*            <div className={cl.Balance__amount}>*/}
                {/*                {isFreezingInfoLoading*/}
                {/*                    ? <div>loading</div>*/}
                {/*                    : <div>{balance}</div>*/}
                {/*                }*/}
                {/*                /!*{freezeInfo.freezedAmount.toLocaleString('ru-RU')}*!/*/}
                {/*            </div>*/}
                {/*            <div className={cl.Balance__icon}>*/}
                {/*                <GgIcon/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className={cl.Time}>*/}
                {/*            freezed date: {new Date(freezedTime * 1000).toLocaleDateString("en-US")}*/}
                {/*            time: {new Date(freezedTime).toLocaleTimeString("en-US")}*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            button*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className={cl.Rewards}>*/}
                {/*        <div>1</div>*/}
                {/*        <div className={cl.Get_reward}>*/}
                {/*            <div>*/}
                {/*                2*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                3*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <RadioCards
                    create={createMessage}
                    setAmount={setAmount}
                />
            </div>
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