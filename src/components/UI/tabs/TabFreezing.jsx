import React, {useState} from 'react';
import {useInteract} from "../../hooks/useInteract";
import FreezeService from "../../../chain/FreezeService";
import Loader from "../Loader/Loader";


const TabFreezing = ({publicKey}) => {
    const network = 'devnet'
    const [freezingTX, setFreezingTX] = useState(NaN)
    const [amount, setAmount] = useState(0)
    const [freezing, isFreezingLoading, stakeInfoError] = useInteract(async () => {
        const tx = await FreezeService.freezing(network, publicKey, amount)
        setFreezingTX(tx)
    })


    const test = () => {
        console.log('test')
    }

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