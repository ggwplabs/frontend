import React, {useState} from 'react';
import {useInteract} from "../hooks/useInteract";
import FreezeService from "../../chain/FreezeService";
import Loader from "../UI/Loader/Loader";
import FaucetService from "../../chain/FaucetService";


const TabFreezing = ({publicKey}) => {
    const network = 'devnet'
    const [messages, setMessages] = useState([])

    // const removeMessage = (index) => {
    //     setMessages([...messages.slice(0, index), ...messages.splice(index + 1, messages.length)])
    // }
    //
    // const createMessage = async () => {
    //     let message;
    //     try {
    //         setIsAirdropLoading(true)
    //         const tx = await FaucetService.airdrop(network, publicKey, amount)
    //         message = {error: false, text: tx}
    //     } catch (e) {
    //         message = {error: true, text: e.message}
    //     } finally {
    //         setIsAirdropLoading(false)
    //         if (messages.length < 5) {
    //             setMessages([message, ...messages])
    //             setMessages([message, ...messages.splice(0, 4)])
    //         }
    //     }
    // }



    const [freezingTX, setFreezingTX] = useState(NaN)
    const [amount, setAmount] = useState(0)
    const [freezing, isFreezingLoading, stakeInfoError] = useInteract(async () => {
        const tx = await FreezeService.freezing(network, publicKey, amount)
        setFreezingTX(tx)
    })

    return (
        <div>
            {isFreezingLoading
                ? <div
                    style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                    <Loader/>
                </div>
                : <div>
                    {stakeInfoError
                        ? <div>
                            <p>Error! {stakeInfoError}</p>
                        </div>
                        : <div>
                            {freezingTX
                                ? <div>
                                    <p>Successful! {freezingTX}</p>
                                    <a
                                        target={"_blank"}
                                        href={"https://explorer.solana.com/tx/" + freezingTX + '?cluster=devnet'}
                                    >
                                        View in solana explorer
                                    </a>
                                </div>
                                : <div>
                                    <input
                                        type='number'
                                        onChange={e => setAmount(e.target.value)}
                                        placeholder="Amount for airdrop"
                                    />
                                    <button
                                        onClick={freezing}
                                    >
                                        Freezing
                                    </button>
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default TabFreezing;