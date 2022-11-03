import React, {useState} from 'react';
import TabStaking from "./TabStaking";
import TabWallet from "./WalletTab/TabWallet";
import TabFreezing from "./FreezingTab/TabFreezing";
import cl from './Tabs.module.css'
import TabButton from "../UI/Buttons/TabButton";


const Tabs = ({publicKey}) => {
    const [currentTab, setCurrentTab] = useState('1');

    const tabs = [
        {
            id: 1,
            tabTitle: 'Wallet',
            content:
                <TabWallet
                    publicKey={publicKey}
                />
        },
        {
            id: 2,
            tabTitle: 'Freezing',
            content:
            <TabFreezing
                publicKey={publicKey}
            />
        },
        {
            id: 3,
            tabTitle: 'Staking',
            content: <div className={cl.style_1}>
                <div className={cl.style_2}>
                    block 1
                </div>
                <div className={cl.style_3}>
                    block 2
                </div>
            </div>
                // <TabStaking
                //     publicKey={publicKey}
                // />
        },
        {
            id: 4,
            tabTitle: 'NFT',
            content: <div>TEST4</div>
            // <FreezingTab
            //     publicKey={publicKey}
            // />
        },
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
        <div className={cl.Father}>
            <div className={cl.Tabs_box}>
                <div className={cl.Tabs}>
                    {tabs.map((tab, i) =>
                        <TabButton key={i} id={tab.id} disabled={currentTab === `${tab.id}`}
                                   onClick={(handleTabClick)}>{tab.tabTitle}</TabButton>
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
        </div>
    );
};

export default Tabs;