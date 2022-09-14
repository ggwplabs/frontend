import React, {useEffect, useState} from "react";
import LoginForm from "./components/UI/LoginForm/LoginForm";
import Tabs from "./components/Tabs";
import CustomSelect from "./components/UI/select/CustomSelect";

function App() {
    const [pubKey, setPubKey] = useState(null);

    // const getProvider = () => {
    //     if ('phantom' in window) {
    //         const provider = window.phantom?.solana;
    //
    //         if (provider?.isPhantom) {
    //             return provider;
    //         }
    //     }
    // };

    const isPhantomInstalled = window.phantom?.solana?.isPhantom

    // useEffect( () => {
    //
    //     provider.on("connect", (publicKey) => {
    //         console.log('connect')
    //         setPubKey(publicKey);
    //     });
    //
    //     provider.on("disconnect", () => {
    //         console.log('disconnect')
    //         setPubKey(null);
    //     });
    //
    //     provider.on('accountChanged', (publicKey) => {
    //         setPubKey(publicKey);
    //         provider.connect()
    //     });
    // }, [provider]);

    if (isPhantomInstalled){
        const provider = window.phantom?.solana;
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
                            marginTop: 30}}
                        onClick={async () => await provider.connect()}
                    >
                        Login with phantom
                    </button>
                </div>
            )
        }
    } else {
        return(
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
}

export default App;
