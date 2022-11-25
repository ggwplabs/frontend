import React, {useState} from 'react';
import TabWallet from "./WalletTab/TabWallet";
import TabFreezing from "./FreezingTab/TabFreezing";
import cl from './Tabs.module.css'
import TabButton from "../UI/Buttons/TabButton";
import TabStaking from "./StakingTab/TabStaking";


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
            content:
                <TabStaking
                    publicKey={publicKey}
                />
        },
        // {
        //     id: 4,
        //     tabTitle: 'NFT',
        //     content: <div>TEST4</div>
        // },
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