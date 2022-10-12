import React, {useEffect, useState} from "react";
import Tabs from "./components/Tabs/Tabs";
import Phantom from "./components/Phantom/Phantom";
import './styles/App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginButton from "./components/UI/Buttons/LoginButton";


function App() {
    const [pubKey, setPubKey] = useState(null);
    const isPhantomInstalled = window.phantom?.solana?.isPhantom

    const getProvider = () => {
        if ('Phantom' in window) {
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                return provider;
            }
        }
    };

    const provider = getProvider()

    useEffect(() => {

        if (isPhantomInstalled) {
            window.solana.on("connect", (publicKey) => {
                setPubKey(publicKey);
            });

            window.solana.on("disconnect", () => {
                setPubKey(null);
            });

            window.solana.on('accountChanged', (publicKey) => {
                setPubKey(publicKey);
                window.solana.connect()
            });
        }

    }, [window.solana, isPhantomInstalled]);


    return (
        <div>
            {!isPhantomInstalled
                ? <div>
                    <Header/>
                    <div className="Login">
                        <Phantom/>
                    </div>
                    <Footer/>
                </div>
                : <div>
                    {pubKey
                        ? <div>
                            <Header/>
                            <div className="Body"></div>
                            <Tabs
                                publicKey={pubKey}
                            />
                            <Footer/>
                        </div>
                        : <div>
                            <Header/>
                            <div className="Login">
                                <LoginButton
                                    onClick={async () => await window.solana.connect()}
                                >
                                    Login with Phantom
                                </LoginButton>
                            </div>
                            <Footer/>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default App;
