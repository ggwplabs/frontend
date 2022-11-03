import React, {useState} from 'react';
import TabStaking from "./TabStaking";
import TabFaucet from "./TabFaucet";
import TabFreezing from "./TabFreezing";

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
        {
            id: 3,
            tabTitle: 'Freezing',
            content: <TabFreezing
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