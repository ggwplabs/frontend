import React, {useEffect, useState} from 'react';
import StakeService from "../chain/StakeService";
import Loader from "./UI/Loader/Loader";
import {useInteract} from "./hooks/useInteract";
import StakeForm from "./StakeForm";
import ModalWindow from "./UI/ModalWindow/ModalWindow";

const TabStaking = (props) => {
    const [modal, setModal] = useState(false)
    const [stakeInfo, setStakeInfo] = useState(NaN)
    const [fetchStakeInfo, isStakeInfoLoading, stakeInfoError] = useInteract( async () => {
        const info = await StakeService.getInfo(props.network, props.provider.publicKey)
        setStakeInfo(info)
    })

    useEffect(() => {
        fetchStakeInfo()

        props.provider.on('accountChanged', (publicKey) => {
            fetchStakeInfo()
        });
    }, [props.provider]);

    return (
        {
            id: 1,
            tabTitle: 'Staking',
            title: 'Staking info',
            content:
                <div>
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
                    {stakeInfoError &&
                        <p>
                            Error! {stakeInfoError}
                        </p>
                    }
                    {isStakeInfoLoading
                        ? <div
                        style={{display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10}}>
                            <Loader/>
                        </div>
                        : <div>
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
                            <button onClick={() => setModal(true)}>
                                Stake
                            </button>
                            <ModalWindow visible={modal} setVisible={setModal}>
                                <StakeForm
                                    network={props.network}
                                    publikKey={props.provider.publicKey}
                                    GGWPWallet={stakeInfo.GGWPWallet}
                                />
                            </ModalWindow>

                        </div>
                    }
                </div>
        }
    );
};

export default TabStaking;