import React, {useState} from 'react';
import TabStaking from "./TabStaking";
import TabNFT from "./TabNFT";
import TabGameCenter from "./TabGameCenter";
import TabFaucet from "./TabFaucet";

const Tabs = ({publicKey}) => {
    const [currentTab, setCurrentTab] = useState('1');

    const tabs = [
        {
            id: 1,
            tabTitle: 'Staking',
            content: <TabStaking
                publicKey={publicKey}
            />
        },
        {
            id: 2,
            tabTitle: 'Faucet',
            content: <TabFaucet
                publicKey={publicKey}
            />
        },
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                {tabs.map((tab, i) =>
                    <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`}
                            onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
            </div>
            <div>
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && <div><p className='title'>{tab.title}</p>
                            <div>{tab.content}</div>
                        </div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;