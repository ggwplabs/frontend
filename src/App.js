import React, {useEffect, useState} from "react";
import Tabs from "./components/Tabs/Tabs";
import Petra from "./components/Petra/Petra";
import './styles/App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginButton from "./components/UI/Buttons/LoginButton";
import Loader from "./components/UI/Loader/Loader";
import {useInteract} from "./components/hooks/useInteract";
import Testnet from "./components/Petra/Testnet";
import WalletNotInit from "./components/Petra/WalletNotInit";


function App() {

    const [wallet, setWallet] = useState(null);
    const [network, setNetwork] = useState(null);
    const [isPetraInstalled, setIsPetraInstalled] = useState(false)

    const getNetwork = async () => {
        const retVol = await window.aptos.network()
        return {networkName: retVol}
    }

    const connect = async () => {
        await window.aptos.connect()
        setWallet(await window.aptos.account())
    }

    const disconnect = async () => {
        await window.aptos.disconnect()
        setWallet(null)
    }

    const [getInfo, isLoading, Error] = useInteract(async () => {
        if (window.aptos) {
            setIsPetraInstalled(true)
            setNetwork(await getNetwork())
        }
    })

    useEffect(() => {
        if (window.aptos) {
            getInfo()
            window.aptos.onAccountChange((newAccount) => {
                setWallet(newAccount)
            })
            window.aptos.onNetworkChange((newNetwork) => {
                getInfo()
            });
            window.aptos.onDisconnect(() => {
                setWallet(null);
            });
        }

    }, [window.aptos]);

    if (isLoading) {
        return (
            <div><Loader/></div>
        )
    }

    if (isPetraInstalled) {
        if (network) {
            if (network.networkName === "Testnet") {
                if (wallet) {
                    return (
                        <div>
                            <Header
                                isLogin={wallet}
                                func= {wallet ? disconnect : connect}
                            />
                            <div className="Body"></div>
                            <Tabs
                                wallet={wallet}
                            />
                            <Footer
                                isLogin={wallet}
                                func= {wallet ? disconnect : connect}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <Header
                                isLogin={wallet}
                                func= {wallet ? disconnect : connect}
                            />
                            <div className="Login">
                                <LoginButton
                                    onClick={connect}
                                >
                                    Login with Petra
                                </LoginButton>
                            </div>
                            <Footer
                                isLogin={wallet}
                                func= {wallet ? disconnect : connect}
                            />
                        </div>
                    )
                }
            } else {
                return (
                    <div>
                        <Header
                            isLogin={wallet}
                            func= {wallet ? disconnect : connect}
                        />
                        <div className="Login">
                            <Testnet/>
                        </div>
                        <Footer
                            isLogin={wallet}
                            func= {wallet ? disconnect : connect}
                        />
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <Header
                        isLogin={wallet}
                        func= {wallet ? disconnect : connect}
                    />
                    <div className="Login">
                        <WalletNotInit/>
                    </div>
                    <Footer
                        isLogin={wallet}
                        func= {wallet ? disconnect : connect}
                    />
                </div>
            )
        }
    } else {
        return (
            <div>
                <Header
                    isLogin={wallet}
                    func= {wallet ? disconnect : connect}
                />
                <div className="Login">
                    <Petra/>
                </div>
                <Footer
                    isLogin={wallet}
                    func= {wallet ? disconnect : connect}
                />
            </div>
        )
    }

}

export default App;
