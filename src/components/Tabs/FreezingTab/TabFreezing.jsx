import React, {useEffect, useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import FreezeService from "../../../chain/FreezeService";
import Loader from "../../UI/Loader/Loader";
import SolscanBox from "../SolscanBox";
import cl from './TabFreezing.module.css'
import RadioCards from "./FreezingComponent/RadioCards";
import MessagesList from "../../MessageList/MessagesList";
import {ReactComponent as GgIcon} from "../../../images/Tabs/Wallet/GG_coin_icon.svg";
import {ReactComponent as Clock} from "../../../images/Tabs/Freezing/clock.svg";
import FreezingComponent from "./FreezingComponent/FreezingComponent";


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

                </div>
            </div>
            <FreezingComponent
                network="devnet"
                publicKey={publicKey}
                createMessage={createMessage}
                setIsMessageLoading={setIsMessageLoading}
                isMessageLoading={isMessageLoading}
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