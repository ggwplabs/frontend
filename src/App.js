import React, {useEffect, useState} from "react";
import Tabs from "./components/Tabs/Tabs";
import Phantom from "./components/Phantom/Phantom";
import './styles/App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginButton from "./components/UI/Buttons/LoginButton";


function App() {

    const [wallet, setWallet] = useState(null);
    const isPetraInstalled = window.aptos


    if (isPetraInstalled) {
        window.aptos.onAccountChange((newAccount) => {
            setWallet(newAccount)
            connect()
        })
    }


    const connect = async () => {
        await window.aptos.connect()
        setWallet(await window.aptos.account())
    }

    const disconnect = async () => {
        await window.aptos.disconnect()
        setWallet(null)
    }

    return (<div>
            {isPetraInstalled
                ? <div>
                    {wallet
                        ? <div>
                            <Header/>
                            <div className="Body"></div>
                            <Tabs
                                wallet={wallet}
                            />
                            <Footer/>
                        </div>
                        : <div>
                            <Header/>
                            <div className="Login">
                                <LoginButton
                                    onClick={connect}
                                >
                                    Login with Petra
                                </LoginButton>
                            </div>
                            <Footer/>
                        </div>
                    }
                </div>
                : <div>
                    <Header/>
                    <div className="Login">
                        <Phantom/>
                    </div>
                    <Footer/>
                </div>
            }
        </div>
    )
}

export default App;
