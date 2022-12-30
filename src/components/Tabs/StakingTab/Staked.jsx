import React, {useEffect, useState} from 'react';
import cl from "./Staked.module.css";
import {ReactComponent as Ggwp} from "../../../images/Tabs/Ggwp.svg"
import {ReactComponent as Clock} from "../../../images/Tabs/Freezing/clock.svg";

const Staked = ({balance, start, apr}) => {
    const [time, setTime] = useState(start)

    useEffect(() => {
        setTime(start - (Date.now() / 1000) | 0)
    }, [start]);

    const hours = time / 3600 | 0
    const min = (time % 3600) / 60 | 0
    const sec = (time % 3600) % 60

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((time) => time >= 1 ? time - 1 : 0);
        }, 1000)
    }, [])

    return (
        <div className={cl.Rewards}>
            <div className={cl.Rewards_balance_and_time}>
                <div className={cl.Rewards_balance}>
                    <div className={cl.Rewards_text}>Your APR: {apr}% </div>
                    <div className={cl.Rewards_amount}>{balance}</div>
                </div>
                <div className={cl.Rewards_time}>
                    <Clock className={cl.Rewards_burn}/>
                    <div>Epoch end at:</div>
                    <div className={cl.Time__elem}>h: {hours}</div>
                    <div className={cl.Time__border_white}>min: {min}</div>
                    <div className={cl.Time__elem}>sec: {sec}</div>
                </div>
            </div>
            <div className={cl.Rewards_icon}>
                <Ggwp/>
            </div>
        </div>
    );
};

export default Staked;


