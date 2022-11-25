import React from 'react';
import cl from "../TabFreezing.module.css";
import RadioCards from "./RadioCards";
import Unfreez from "./Unfreez";
import Loader from "../../../UI/Loader/Loader";

const FreezingComponent = ({
                               publicKey,
                               createMessage,
                               setIsMessageLoading,
                               isMessageLoading,
                               isLoadingInfo,
                               frozenBalance,
                               gpassBalance,
                               willBurn,
                               lastGettingGpass,
                               rewardPeriod
                           }) => {

    const items = [
        {id: 1, gpass: 5,  ggwp: 1080, color: '#5DDFA5'},
        {id: 2, gpass: 10, ggwp: 2160, color: '#12D6C2'},
        {id: 3, gpass: 15, ggwp: 3240, color: '#1E5FDF'},
        {id: 4, gpass: 20, ggwp: 4320, color: '#147EFF'},
        {id: 5, gpass: 25, ggwp: 5184, color: '#FFCB14'},
    ]



    return (
        <div>
            {isLoadingInfo
                ? <div className={cl.Loader_box}>
                    <Loader/>
                </div>
                : <div>
                    {frozenBalance === 0
                        ? <RadioCards
                            publicKey={publicKey}
                            create={createMessage}
                            setIsMessageLoading={setIsMessageLoading}
                            isMessageLoading={isMessageLoading}
                            items={items}
                        />
                        : <Unfreez
                            publicKey={publicKey}
                            frozenBalance={frozenBalance}
                            nextReward={0}
                            gpassBalance={gpassBalance}
                            willBurn={willBurn}
                            create={createMessage}
                            setIsMessageLoading={setIsMessageLoading}
                            isMessageLoading={isMessageLoading}
                            lastGettingGpass={lastGettingGpass}
                            rewardPeriod={rewardPeriod}
                            items={items}
                        />
                    }
                </div>
            }
        </div>
    )

};

export default FreezingComponent;