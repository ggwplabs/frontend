import React, {useEffect, useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import Loader from "../Loader/Loader";
import FaucetService from "../../../chain/FaucetService";
import MessagesList from "../MessageList/MessagesList";

const TabFaucet = ({publicKey}) => {
    const [messages, setMessages] = useState([])
    const [amount, setAmount] = useState(0)
    const [isAirdropLoading, setIsAirdropLoading] = useState(false)

    const removeMessage = (index) => {
        setMessages([...messages.slice(0, index), ...messages.splice(index+1, messages.length)])
    }

    const createMessage = async () => {
        let message;
        try {
            setIsAirdropLoading(true)
            const tx = await FaucetService.airdrop('devnet', publicKey, amount)
            message = {error: false, text: tx}
        } catch (e) {
            message = {error: true, text: e.message}
        } finally {
            setIsAirdropLoading(false)
            if (messages.length < 5) {
                setMessages([message, ...messages])
            } else {
                console.log(messages)
                setMessages([message, ...messages.splice(0, 4)])
                console.log(messages)
            }
        }
    }

    return (
        <div>
            {isAirdropLoading
                ?<Loader/>
                : <div></div>
            }
            <MessagesList
                messages={messages}
                remove={removeMessage}
            />
            <div>
                <input
                    style={{
                        marginTop: 5 ,
                        marginBottom: 5,
                    }}
                    type='number'
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Amount for airdrop"
                />
                <button
                    disabled={isAirdropLoading}
                    onClick={createMessage}
                >
                    Airdrop
                </button>
            </div>
        </div>
    );
};

export default TabFaucet;