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

    // const isPhantomInstalled = window.phantom?.solana?.isPhantom

    useEffect(() => {

        window.solana.on("connect", (publicKey) => {
            console.log('connect')
            setPubKey(publicKey);
        });

        window.solana.on("disconnect", () => {
            console.log('disconnect')
            setPubKey(null);
        });

        window.solana.on('accountChanged', (publicKey) => {
            setPubKey(publicKey);
            window.solana.connect()
        });
    }, [window.solana]);

    if (pubKey) {
        return (
            <div>
                <Tabs
                    publicKey={pubKey}
                />
                <button
                    style={{marginTop: 30}}
                    onClick={async () => await window.solana.disconnect()}
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
    // return(
    //     <div>
    //         <a
    //             target={"_blank"}
    //             href={"https://phantom.app/"}
    //         >
    //             Install phantom
    //         </a>
    //     </div>
    // )
}

export default App;
