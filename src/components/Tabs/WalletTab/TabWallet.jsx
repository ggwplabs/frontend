import React, {useEffect, useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import Loader from "../../UI/Loader/Loader";
import FaucetService from "../../../chain/FaucetService";
import MessagesList from "../../MessageList/MessagesList";
import WalletService from "../../../chain/WalletService";
import cl from './WalletTab.module.css'
import GgwpBalance from "./GgwpBalance";
import Faucet from "./Faucet";

const TabWallet = ({publicKey}) => {
    const network = 'devnet'
    const [messages, setMessages] = useState([])
    const [amount, setAmount] = useState(0)
    const [balance, setBalance] = useState(0)
    const [isAirdropLoading, setIsAirdropLoading] = useState(false)
    const [getBalance, isBalanceloading, balanceError] = useInteract(async () => {
        setBalance(await WalletService.getGgwpBalance(network, publicKey))
    })

    const removeMessage = (index) => {
        setMessages([...messages.slice(0, index), ...messages.splice(index + 1, messages.length)])
    }

    const createMessage = async () => {
        let message;
        try {
            setIsAirdropLoading(true)
            const tx = await FaucetService.airdrop(network, publicKey, amount)
            message = {error: false, text: tx}
        } catch (e) {
            message = {error: true, text: e.message}
        } finally {
            setIsAirdropLoading(false)
            if (messages.length < 5) {
                setMessages([message, ...messages])
                setMessages([message, ...messages.splice(0, 4)])
            }
        }
    }

    useEffect(() => {
        getBalance()

    }, [publicKey]);

    return (
        <div
            className={cl.WalletTab_box}
        >
            {isAirdropLoading
                ? <Loader/>
                : <div></div>
            }
            <MessagesList
                messages={messages}
                remove={removeMessage}
            />
            <div>
                {isBalanceloading
                    ? <Loader/>
                    : <div
                        className={cl.GgwpBalance_box}
                    >{balanceError
                        ? <p>balanceError</p>
                        : <GgwpBalance balance={balance}/>}
                        </div>
                }
            </div>
            <div>
                test
            </div>
            <Faucet
                setAmount={setAmount}
                isAirdropLoading={isAirdropLoading}
                createMessage={createMessage}
            />
        </div>
    );
};

export default TabWallet;