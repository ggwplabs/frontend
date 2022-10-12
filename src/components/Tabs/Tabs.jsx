import React, {useState} from 'react';
import TabStaking from "./TabStaking";
import TabWallet from "./WalletTab/TabWallet";
import TabFreezing from "./TabFreezing";
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
            tabTitle: 'Staking',
            content: <div>TEST2</div>
                // <TabStaking
                //     publicKey={publicKey}
                // />
        },
        {
            id: 3,
            tabTitle: 'Freezing',
            content: <div>TEST3</div>
                // <TabFreezing
                //     publicKey={publicKey}
                // />
        },
        {
            id: 4,
            tabTitle: 'NFT',
            content: <div>TEST4</div>
            // <TabFreezing
            //     publicKey={publicKey}
            // />
        },
    ];

    const handleTabClick = (e) => {
        setCurrentTab(e.target.id);
    }

    return (
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
    );
};

export default Tabs;