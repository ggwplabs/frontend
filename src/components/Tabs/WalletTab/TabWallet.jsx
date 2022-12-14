import React, {useEffect, useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import FaucetService from "../../../chain/FaucetService";
import MessagesList from "../../MessageList/MessagesList";
import WalletService from "../../../chain/WalletService";
import cl from './WalletTab.module.css'
import GgwpBalance from "./GgwpBalance";
import Faucet from "./Faucet";
import Convertor from "./Convertor";
import BuyGgwp from "./BuyGgwp";
import AptosBox from "../aptosBox";

const TabWallet = ({wallet}) => {
    const currencyList = [
        {id: '1', name: 'USDT', value: 0.5},
        {id: '2', name: 'USDC', value: 0.25},
        {id: '3', name: 'BTC', value: 1.5},
        {id: '4', name: 'BTC', value: 1.5},
        {id: '5', name: 'BTC', value: 1.5},
        {id: '6', name: 'BTC', value: 1.5},
        {id: '7', name: 'BTC', value: 1.5},
        {id: '8', name: 'BTC', value: 1.5},
        {id: '9', name: 'BTC', value: 1.5},
        {id: '10', name: 'BTC', value: 1.5},
        {id: '11', name: 'BTC', value: 1.5},
        {id: '12', name: 'BTC', value: 1.5},
        {id: '13', name: 'BTC', value: 1.5}
    ];

    const [currency, setCurrency] = useState(currencyList[0])
    const [messages, setMessages] = useState([])
    const [balance, setBalance] = useState(0)
    const [isAirdropLoading, setIsAirdropLoading] = useState(false)
    const [getBalance, isBalanceloading, balanceError] = useInteract(async () => {
        setBalance(await WalletService.getGgwpBalance(wallet))
    })

    const removeMessage = (id) => {
        setMessages(messages.filter(message => message.id !== id))
    }

    const createMessage = async () => {
        let message;
        try {
            setIsAirdropLoading(true)
            const tx = await FaucetService.airdrop()
            message = {id: Date.now(), error: false, text: tx}
        } catch (e) {
            message = {id: Date.now(), error: true, text: e.message}
        } finally {
            setIsAirdropLoading(false)
            if (messages.length < 5) {
                setMessages([message, ...messages])
            } else {
                setMessages([message, ...messages.splice(0, 4)])
            }
        }
    }


    useEffect(() => {
        getBalance()

    }, [wallet, isAirdropLoading]);


    const links = [
        {name: "eToro", ref: "#"},
        {name: "Panckakecup", ref: "#"},
        {name: "Coinmarketcup", ref: "#"},
        {name: "CoinGecko", ref: "#"},
        {name: "Gate.io", ref: "#"},
        {name: "Kraken", ref: "#"},
        {name: "KuCoin", ref: "#"},
        {name: "Gemini", ref: "#"},
        {name: "Robinhood Crypto", ref: "#"},
        {name: "Webull Crypto", ref: "#"},
        {name: "TradeStation Crypto", ref: "#"},
    ];


    return (
        <div className={cl.Father}>
            <div className={cl.WalletTab_box}>
                <MessagesList
                    messages={messages}
                    remove={removeMessage}
                    isLoading={isAirdropLoading}
                />
                <div className={cl.Wallet_block}>
                    <GgwpBalance
                        balance={balance}
                        isLoading={isBalanceloading}
                        Error={balanceError}
                    />
                    <Convertor
                        items={currencyList}
                        currency={currency}
                        setCurrency={setCurrency}
                    />
                </div>
                <BuyGgwp
                    currency={currency}
                    links={links}
                />
                <Faucet
                    isAirdropLoading={isAirdropLoading}
                    createMessage={createMessage}
                    wallet={wallet}
                />
                <AptosBox/>
            </div>
        </div>
    )
};


export default TabWallet;