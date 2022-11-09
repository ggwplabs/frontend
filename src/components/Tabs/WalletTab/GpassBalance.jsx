import React from 'react';
import cl from "./GpassBalance.module.css";
import {ReactComponent as Burn} from "../../../images/Tabs/Freezing/burn.svg";
import {ReactComponent as Gpass} from "../../../images/Tabs/g_pass_logo.svg";

const GpassBalance = ({gpassBalance}) => {
    return (
        <div className={cl.Rewards}>
            <div className={cl.Rewards_balance_and_time}>
                <div className={cl.Rewards_balance}>
                    <div className={cl.Rewards_text}>Your Rewards:</div>
                    <div className={cl.Rewards_amount}>{gpassBalance}</div>
                </div>
                <div className={cl.Rewards_time}>
                    <Burn className={cl.Rewards_burn}/>
                    <div>Reward will burn in:</div>
                    <div className={cl.Time__elem}>h: 23</div>
                    <div className={cl.Time__border_white}>min: 59</div>
                    <div className={cl.Time__elem}>sec: 59</div>
                </div>
            </div>
            <div className={cl.Rewards_icon}>
                <Gpass/>
            </div>
        </div>
    );
};

export default GpassBalance;