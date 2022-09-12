import React, {useState} from 'react';
import TabStaking from "./TabStaking";
import TabNFT from "./TabNFT";
import TabGameCenter from "./TabGameCenter";

const Tabs = (provider, network) => {
    const [currentTab, setCurrentTab] = useState('1');

    const tabs = [
        TabStaking(
            provider,
            network
        ),
        TabNFT(),
        TabGameCenter()
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
                    <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
                )}
            </div>
            <div className='content'>
                {tabs.map((tab, i) =>
                    <div key={i}>
                        {currentTab === `${tab.id}` && <div><p className='title'>{tab.title}</p><div>{tab.content}</div></div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;