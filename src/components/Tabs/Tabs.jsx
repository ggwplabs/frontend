import React, {useState} from 'react';
import TabWallet from "./WalletTab/TabWallet";
import TabFreezing from "./FreezingTab/TabFreezing";
import cl from './Tabs.module.css'
import TabButton from "../UI/Buttons/TabButton";
import TabStaking from "./StakingTab/TabStaking";


const Tabs = ({wallet}) => {
    const [currentTab, setCurrentTab] = useState('1');

    const tabs = [
        {
            id: 1,
            tabTitle: 'Wallet',
            content:
                <TabWallet
                    wallet={wallet}
                />
        },
        {
            id: 2,
            tabTitle: 'Freezing',
            content:
                <TabFreezing
                    wallet={wallet}
                />
        },
        {
            id: 3,
            tabTitle: 'Staking',
            content:
                <TabStaking
                    wallet={wallet}
                />
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
                    <button className={cl.NFT}>nft</button>
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