import React from 'react';

const Faucet = ({setAmount, isAirdropLoading, createMessage}) => {
    return (
        <div
            style={{
                borderStyle: "solid none solid none",
                borderWidth: 1,
                borderColor: '#147EFF',
                padding: '10px 10px'
            }}
        >
            FAUCET
            <div>
                <div>
                    Enter amount GGWP
                </div>
                <input
                    style={{
                        marginTop: 5,
                        marginBottom: 5,
                        marginRight: 15,
                        width: '522px',
                        height: '40px',
                    }}
                    type='number'
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Maximum 3000 GGWP per time"
                />
                <button
                    disabled={isAirdropLoading}
                    onClick={createMessage}
                >
                    Airdrop
                </button>
            </div>
        </div>
    );
};

export default Faucet;