import React, {useEffect, useState} from 'react';
import StakeService from "../../../chain/StakeService";
import {useInteract} from "../../hooks/useInteract";
import EpochCards from "./EpochCards";
import Loader from "../../UI/Loader/Loader";
import MessagesList from "../../MessageList/MessagesList";
import cl from "../FreezingTab/TabFreezing.module.css";
import SolscanBox from "../SolscanBox";
import Staking from "./Staking";
import Apr from "./apr";

const TabStaking = ({wallet}) => {

    const [info, setInfo] = useState(NaN)
    const [getInfo, isInfoLoading, getInfoError] = useInteract(async () => {
        const inf = await StakeService.getInfo(wallet)
        setInfo(inf)
    })

    const [messages, setMessages] = useState([])
    const [isMessageLoading, setIsMessageLoading] = useState(false)
    const removeMessage = (id) => {
        setMessages(messages.filter(message => message.id !== id))
    }

    const createMessage = async (message) => {
        if (messages.length < 5) {
            setMessages([message, ...messages])
        } else {
            setMessages([message, ...messages.splice(0, 4)])
        }
    }

    useEffect(() => {
        getInfo()

    }, [wallet, isMessageLoading]);

    return (
        <div>
            <MessagesList
                messages={messages}
                remove={removeMessage}
                isLoading={isMessageLoading}
            />
            {isInfoLoading
                ? <div className={cl.Loader_box}>
                    <Loader/>
                </div>
                : <div>
                    <EpochCards
                        info={info}
                    />
                    {info.amount === 0
                        ? <Staking
                            isLoading={isMessageLoading}
                            setIsLoading={setIsMessageLoading}
                            createMessage={createMessage}
                            minStakeAmount={info.minStakeAmount}
                        />
                        : <Apr
                            info={info}
                            setIsMessageLoading={setIsMessageLoading}
                            isMessageLoading={isMessageLoading}
                            create={createMessage}
                        />
                    }
                </div>
            }
            <div className={cl.Info}>
                <h1>HOLD - 30 DAYS</h1>
                <ul>
                    <li>Fee for exit from Staking earlier than in 30 days is 15% of the frozen tokens amount.</li>
                    <li>Fee for Staking entry is 8%. It is retained in favor of the Accumulation Fund.</li>
                    <li>In order to receive a staking award, you need to go through a complete epoch. The bonus is
                        accrued upon completion of the stakingg.
                    </li>
                    <li>Staking parameters can be adjusted by the development team or by voting.</li>
                </ul>
            </div>
            <SolscanBox/>
        </div>
    );
};

export default TabStaking;