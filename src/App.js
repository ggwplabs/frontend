import React, {useEffect, useState} from "react";
import Tabs from "./components/UI/tabs/Tabs";


function App() {
    const [pubKey, setPubKey] = useState(null);
    const isPhantomInstalled = window.phantom?.solana?.isPhantom

    const getProvider = () => {
        if ('phantom' in window) {
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

    if (!isPhantomInstalled) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <p>For continuum, please install <a
                    target={"_blank"}
                    href={"https://phantom.app/"}
                >
                    phantom
                </a></p>
            </div>
        )
    }

    if (pubKey) {
        return (
            <div>
                <Tabs
                    publicKey={pubKey}
                />
                <button
                    style={{marginTop: 30}}
                    onClick={async () => await provider.disconnect()}
                > Logout
                </button>
            </div>
        )
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <button
                    style={{
                        marginTop: 30
                    }}
                    onClick={async () => await window.solana.connect()}
                >
                    Login with phantom
                </button>
            </div>
        )
    }

    return (
        <div>
            <a
                target={"_blank"}
                href={"https://phantom.app/"}
            >
                Install phantom
            </a>
        </div>
    )
}

export default App;
