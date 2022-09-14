import React, {useEffect, useState} from "react";
import LoginForm from "./components/UI/LoginForm/LoginForm";
import Tabs from "./components/Tabs";
import CustomSelect from "./components/UI/select/CustomSelect";

function App() {
    const [pubKey, setPubKey] = useState(null);

    const getProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                return provider;
            }
        } else {
            window.alert("Get a phantom wallet")
            window.location = "https://phantom.app/"
        }
    };

    const provider = getProvider();
    console.log(provider)

    useEffect(() => {

        provider.on("connect", (publicKey) => {
            setPubKey(publicKey);
        });

        provider.on("disconnect", () => {
            setPubKey(null);
        });

        provider.on('accountChanged', (publicKey) => {
            setPubKey(publicKey);
            provider.connect()
        });
    }, [provider]);

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
}

export default App;
