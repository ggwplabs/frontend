import React, {useState} from 'react';
import {useInteract} from "./hooks/useInteract";
import Loader from "./UI/Loader/Loader";
import FaucetService from "../chain/FaucetService";

const TabFaucet = ({publicKey}) => {
    const [amount, setAmount] = useState(0)
    const [tx, seTx] = useState('')
    const [airdrop, isAirdropLoading, airdropError] = useInteract(async () => {
        const tx = await FaucetService.airdrop('devnet', publicKey, amount)
        seTx(tx)
    })
    return (
        <div>
            {isAirdropLoading
                ? <div
                    style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                    <Loader/>
                </div>
                : <div>
                    {airdropError
                        ? <div>
                            <p>Error! {airdropError}</p>
                        </div>
                        : <div>
                            {tx
                                ?<div>
                                    <p>Successful! {tx}</p>
                                    <a
                                        target={"_blank"}
                                        href={"https://explorer.solana.com/"+ tx +'?cluster=devnet'}
                                    >
                                        View in solana explorer
                                    </a>
                                </div>
                                :<div>
                                    <input
                                        type='number'
                                        onChange={e => setAmount(e.target.value)}
                                        placeholder="Amount for airdrop"
                                    />
                                    <button
                                        onClick={airdrop}
                                    >
                                        Airdrop
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

export default TabFaucet;