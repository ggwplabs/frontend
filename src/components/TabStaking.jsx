import React, {useEffect, useState} from 'react';
import StakeService from "../chain/StakeService";
import Loader from "./UI/Loader/Loader";
import {useInteract} from "./hooks/useInteract";
import StakeForm from "./StakeForm";
import ModalWindow from "./UI/ModalWindow/ModalWindow";
import StakeInfo from "./StakeInfo";

const TabStaking = ({publicKey}) => {
    const network = 'devnet';
    const [modalStake, setModalStake] = useState(false)
    const [flag, setFlag] = useState(false)
    const [modalWithdraw, setModalWithdraw] = useState(false)
    const [stakeInfo, setStakeInfo] = useState(NaN)
    const [withdrawTx, setwithdrawTx] = useState(NaN)
    const [fetchStakeInfo, isStakeInfoLoading, stakeInfoError] = useInteract(async () => {
        const info = await StakeService.getInfo(network, publicKey)
        setStakeInfo(info)
    })
    const [withdraw, isWithdrawLoading, withdrawError] = useInteract(async () => {
        const tx = await StakeService.withdraw(network, publicKey, stakeInfo.GGWPWallet)
        setwithdrawTx(tx)
    })

    useEffect(() => {
        fetchStakeInfo()

    }, [publicKey, flag]);

    const withdrawClick = () => {
        setModalWithdraw(true)
        withdraw()
    }

    return (
        <div>
            <p>
                Wallet address: {publicKey.toString()}
            </p>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(publicKey.toString())
                }}
            >
                Copy address
            </button>
            {stakeInfoError
                ? <div>
                    {stakeInfoError === 'failed to get token account balance: Invalid param: could not find account'
                        ?<p>Now you have not GGWP tokens, use faucet for mint</p>
                        :<p>
                            Error! {stakeInfoError}
                        </p>
                    }
                </div>
                : <div>
                    {isStakeInfoLoading ? <div
                        style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                        <Loader/>
                    </div> : <div>
                        <p>
                            GGWPWallet: {stakeInfo.GGWPWallet}
                        </p>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(stakeInfo.GGWPWallet)
                            }}
                        >
                            Copy address
                        </button>
                        <p>
                            GGWPBalance: {stakeInfo.GGWPBalance}
                        </p>
                        {stakeInfo.amount !== 0
                            ? <StakeInfo
                                stakeInfo={stakeInfo}
                            />
                            : <div></div>
                        }
                        <button onClick={() => setModalStake(true)}>
                            Stake
                        </button>
                        <button onClick={() => withdrawClick()}>
                            Withdraw
                        </button>
                        <ModalWindow visible={modalStake || modalWithdraw} setVisible1={setModalStake}
                                     setVisible2={setModalWithdraw} flag={flag} setFlag={setFlag}>
                            {modalStake ? <StakeForm
                                network={network}
                                publikKey={publicKey}
                                GGWPWallet={stakeInfo.GGWPWallet}
                            /> : <div>
                                {isWithdrawLoading
                                    ? <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: 10,
                                            marginBottom: 10
                                        }}>
                                        <Loader/>
                                    </div>
                                    : <div>
                                        {withdrawError
                                            ? <div>
                                                <p>Error! {withdrawError}</p>
                                            </div>
                                            : <div>
                                                <p>
                                                    Successful! {withdrawTx}
                                                    <a
                                                        target={"_blank"}
                                                        href={"https://explorer.solana.com/tx/"+ withdrawTx +'?cluster=devnet'}
                                                    >
                                                        View in solana explorer
                                                    </a>
                                                </p>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>}
                        </ModalWindow>
                    </div>}
                </div>}
        </div>
    )
};

export default TabStaking;