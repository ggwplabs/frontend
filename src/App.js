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
import {AptosClient} from "aptos";
import * as Addr from "./chain/Addresses";


function App() {

    const [wallet, setWallet] = useState(null);
    const [network, setNetwork] = useState({networkName: 'null'});
    const [isPetraInstalled, setIsPetraInstalled] = useState(false)

    const getNetwork = async () => {
        const retVol = await window.aptos.network()
        return {networkName: retVol}
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

    const [connectWallet, isLoadConnect, errorConnect] = useInteract(async () => {
        await window.aptos.connect()
        const client = new AptosClient(Addr.NODE_URL)
        const connectWallet = await window.aptos.account()
        const resources = await client.getAccountResources(connectWallet.address)
        setWallet(connectWallet)
    })

    const [changeWallet, isLoadChangeWallet, errorChangeWallet] = useInteract(async () => {
        connectWallet()
        setWallet(await window.aptos.account())
    })

    useEffect(() => {
        if (window.aptos) {
            getInfo()
            window.aptos.onAccountChange(async (newAccount) => {
                changeWallet()
            })
            window.aptos.onNetworkChange((newNetwork) => {
                getInfo()
            });
            window.aptos.onDisconnect(() => {
                setWallet(null);
            });
        }

    }, [window.aptos, wallet]);

    if (isLoadConnect || isLoading || isLoadChangeWallet) {
        return (
            <div>
                <Header
                    isLogin={wallet}
                    func={wallet ? disconnect : connectWallet}
                />
                <div className="Loader" ><Loader/></div>
                <Footer
                    isLogin={wallet}
                    func={wallet ? disconnect : connectWallet}
                />
            </div>
        )
    }

    if (errorChangeWallet || errorConnect) {
        return (
            <div>
                <Header
                    isLogin={wallet}
                    func={wallet ? disconnect : connectWallet}
                />
                <div className="Login">
                    <WalletNotInit/>
                </div>
                <Footer
                    isLogin={wallet}
                    func={wallet ? disconnect : connectWallet}
                />
            </div>
        )
    }

    if (isPetraInstalled) {
        if (wallet) {
            if (network.networkName === "Testnet") {
                return (
                    <div>
                        <Header
                            isLogin={wallet}
                            func={wallet ? disconnect : connectWallet}
                        />
                        <div className="Body"></div>
                        <Tabs
                            wallet={wallet}
                        />
                        <Footer
                            isLogin={wallet}
                            func={wallet ? disconnect : connectWallet}
                        />
                    </div>
                )
            } else {
                return (
                    <div>
                        <Header
                            isLogin={wallet}
                            func={wallet ? disconnect : connectWallet}
                        />
                        <div className="Login">
                            <Testnet/>
                        </div>
                        <Footer
                            isLogin={wallet}
                            func={wallet ? disconnect : connectWallet}
                        />
                    </div>
                )
            }
        }
        return (
            <div>
                <Header
                    isLogin={wallet}
                    func={wallet ? disconnect : connectWallet}
                />
                <div className="Login">
                    <LoginButton
                        onClick={connectWallet}
                    >
                        Login with Petra
                    </LoginButton>
                </div>
                <Footer
                    isLogin={wallet}
                    func={wallet ? disconnect : connectWallet}
                />
            </div>
        )
    }

    return (
        <div>
            <Header
                isLogin={wallet}
                func={wallet ? disconnect : connectWallet}
            />
            <div className="Login">
                <Petra/>
            </div>
            <Footer
                isLogin={wallet}
                func={wallet ? disconnect : connectWallet}
            />
        </div>
    )

}

export default App;
