import React, {useEffect, useState} from "react";
import LoginForm from "./components/UI/LoginForm/LoginForm";
import Tabs from "./components/Tabs";
import CustomSelect from "./components/UI/select/CustomSelect";

function App() {
    const [network, setNetwork] = useState('');
    const [wallet, setWallet] = useState(NaN)

    const [pubKey, setPubKey] = useState(null);



    const connectWallet = async () => {
        try {
            setWallet(await provider.connect())
        } catch (e) {
            console.log(e)
        }
    }

    const getProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;

            if (provider?.isPhantom) {
                return provider;
            }
        } else {
            // window.alert("Get a phantom wallet")
            // window.location = "https://phantom.app/"
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
            connectWallet()
        });
    }, [provider]);

    return (
        <div>
            TEST
        </div>
    )

    if (pubKey) {
        return (
            <div>
                <Tabs
                    provider={provider}
                    network={network}
                />
                <div>
                    <button
                        style={{marginTop: 30}}
                        onClick={async () => await provider.disconnect()}
                    > Logout
                    </button>
                </div>
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
                <div>
                    <CustomSelect
                        value={network}
                        onChange={net => setNetwork(net)}
                        defaultValue="Network"
                        options={[
                            {value: 'devnet', name: 'Devnet'},
                            {value: 'testnet', name: 'Testnet'},
                            {value: 'mainnet-beta', name: 'Mainnet-beta'}
                        ]}
                    />
                </div >
                <button
                    disabled={network === ''}
                    onClick={connectWallet}
                >
                    Login with phantom
                </button>
            </div>
        )
    }
}

export default App;
