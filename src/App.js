import React, {useState} from "react";
import LoginForm from "./components/UI/LoginForm/LoginForm";

function App() {
    const [connected, setConnected] = useState(false)

    async function connectWallet() {
        try {
            await window.solana.connect();
            setConnected(true)
        } catch (e) {
            console.log(e)
        }
    }

    const isPhantomInstalled = window.solana && window.solana.isPhantom

    if (isPhantomInstalled) {
        if (connected) {
            return (
                <div>
                    Welcome!
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
                    <LoginForm connectPhantom={connectWallet}>
                    </LoginForm>
                </div>
            )
        }
    } else {
        return (
            window.alert("Get a phantom wallet"),
            window.location = "https://phantom.app/"
        );
    }
}

export default App;
