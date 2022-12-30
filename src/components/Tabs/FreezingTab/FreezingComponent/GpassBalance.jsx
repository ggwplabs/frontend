import React, {useEffect, useState} from 'react';
import cl from "./GpassBalance.module.css";
import {ReactComponent as Burn} from "../../../../images/Tabs/Freezing/burn.svg";
import {ReactComponent as Gpass} from "../../../../images/Tabs/g_pass_logo.svg";

const GpassBalance = ({info, calc}) => {
    const [time, setTime] = useState()

    useEffect(() => {
        if (info) {
            setTime(info.willBurn)
        }
    }, [info]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((time) => time >= 1 ? time - 1 : 0);
        }, 1000)
    }, [])

    const hours = Math.floor(time / 3600)
    const min = Math.floor((time % 3600) / 60)
    const sec = (time % 3600) % 60

    if (info) {
        if (hours === 0 && min === 0 && sec === 0) {
            calc(true)
        }

        return (
            <div className={cl.Rewards}>
                <div className={cl.Rewards_balance_and_time}>
                    <div className={cl.Rewards_balance}>
                        <div className={cl.Rewards_text}>Your Rewards:</div>
                        <div className={cl.Rewards_amount}>{info.gpassBalance}</div>
                    </div>
                    <div className={cl.Rewards_time}>
                        <Burn className={cl.Rewards_burn}/>
                        <div>Reward will burn in:</div>
                        <div className={cl.Time__elem}>h: {hours}</div>
                        <div className={cl.Time__border_white}>min: {min}</div>
                        <div className={cl.Time__elem}>sec: {sec}</div>
                    </div>
                </div>
                <div className={cl.Rewards_icon}>
                    <Gpass/>
                </div>
            </div>
        );
    }
    return (<div></div>)


};

export default GpassBalance;