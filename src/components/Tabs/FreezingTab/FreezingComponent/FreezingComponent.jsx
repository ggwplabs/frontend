import React from 'react';
import cl from "../TabFreezing.module.css";
import RadioCards from "./RadioCards";
import Unfreez from "./Unfreez";
import Loader from "../../../UI/Loader/Loader";

const FreezingComponent = ({
                               createMessage,
                               setIsMessageLoading,
                               isMessageLoading,
                               isLoadingInfo,
                               info,
                               calc
                           }) => {

    const items = [
        {id: 1, gpass: 5, ggwp: 1000, color: '#5DDFA5'},
        {id: 2, gpass: 10, ggwp: 2000, color: '#12D6C2'},
        {id: 3, gpass: 15, ggwp: 3000, color: '#1E5FDF'},
        {id: 4, gpass: 20, ggwp: 4000, color: '#147EFF'},
        {id: 5, gpass: 25, ggwp: 4800, color: '#FFCB14'},
    ]


    return (
        <div>
            {isLoadingInfo
                ? <div className={cl.Loader_box}>
                    <Loader/>
                </div>
                : <div>
                    {info.frozenBalance === 0
                        ? <RadioCards
                            create={createMessage}
                            setIsMessageLoading={setIsMessageLoading}
                            isMessageLoading={isMessageLoading}
                            items={items}
                        />
                        : <Unfreez
                            create={createMessage}
                            setIsMessageLoading={setIsMessageLoading}
                            isMessageLoading={isMessageLoading}
                            items={items}
                            info={info}
                            calc={calc}
                        />
                    }
                </div>
            }
        </div>
    )

};

export default FreezingComponent;