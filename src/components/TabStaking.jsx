import React, {useEffect, useState} from 'react';
import StakeService from "../chain/StakeService";
import Loader from "./UI/Loader/Loader";
import {useInteract} from "./hooks/useInteract";
import StakeForm from "./StakeForm";
import ModalWindow from "./UI/ModalWindow/ModalWindow";

const TabStaking = (props) => {
    const [modalStake, setModalStake] = useState(false)
    const [flag, setFlag] = useState(false)
    const [modalWithdraw, setModalWithdraw] = useState(false)
    const [stakeInfo, setStakeInfo] = useState(NaN)
    const [withdrawTx, setwithdrawTx] = useState(NaN)
    const [fetchStakeInfo, isStakeInfoLoading, stakeInfoError] = useInteract(async () => {
        const info = await StakeService.getInfo(props.network, props.provider.publicKey)
        setStakeInfo(info)
    })
    const [withdraw, isWithdrawLoading, withdrawError] = useInteract(async () => {
        const tx = await StakeService.withdraw(props.network, props.provider.publicKey, stakeInfo.GGWPWallet)
        setwithdrawTx(tx)
    })

    useEffect(() => {
        fetchStakeInfo()

        props.provider.on('accountChanged', (publicKey) => {
            fetchStakeInfo()
        });
    }, [props.provider.publicKey, flag]);

    const withdrawClick = () => {
        setModalWithdraw(true)
        withdraw()
    }


    return ({
        id: 1, tabTitle: 'Staking', title: 'Staking info', content: <div>
            <p>
                Wallet address: {props.provider.publicKey.toString()}
            </p>
            <button
                onClick={() => {
                    navigator.clipboard.writeText(props.provider.publicKey.toString())
                }}
            >
                Copy address
            </button>
            {stakeInfoError
                ? <div>
                    <p>
                        Error! {stakeInfoError}
                    </p>
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
                            ?
                            <div>
                                <p>
                                    Staking balance: {stakeInfo.amount}
                                </p>
                                <p>
                                    Start staking
                                </p>
                                <p>
                                    date: {stakeInfo.date}
                                </p>
                                <p>
                                    time: {stakeInfo.time}
                                </p>
                            </div>
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
                                network={props.network}
                                publikKey={props.provider.publicKey}
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
    })
};

export default TabStaking;