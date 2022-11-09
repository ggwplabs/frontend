import React, {useState} from 'react';
import {useInteract} from "../hooks/useInteract";
import Loader from "../UI/Loader/Loader";
import StakeService from "../../chain/StakeService";

const StakeForm = ({network, publikKey, GGWPWallet}) => {
    const [amount, setAmount] = useState(0)
    const [tx, seTx] = useState('')
    const [stake, isStakeLoading, stakeError] = useInteract(async () => {
        const tx = await StakeService.stake(network, publikKey, GGWPWallet, amount)
        seTx(tx)
    })
    return (
        <div>
            {isStakeLoading
                ? <div
                    style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                    <Loader/>
                </div>
                : <div>
                    {stakeError
                        ? <div>
                            <p>Error! {stakeError}</p>
                        </div>
                        : <div>
                            {tx
                                ? <div>
                                    <p>Successful! {tx}</p>
                                    <a
                                        target={"_blank"}
                                        href={"https://explorer.solana.com/tx/" + tx + '?cluster=devnet'}
                                    >
                                        View in solana explorer
                                    </a>
                                </div>
                                : <div>
                                    <input
                                        type='number'
                                        onChange={e => setAmount(e.target.value)}
                                        placeholder="Amount for stake"
                                    />
                                    <button
                                        onClick={stake}
                                    >
                                        Stake
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

export default StakeForm;