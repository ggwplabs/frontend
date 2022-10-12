import React from 'react';
import cl from './GgwpBalance.module.css';
import {ReactComponent as GgIcon} from '../../../images/GG_coin_icon.svg'

const GgwpBalance = ({balance}) => {

    return (
        <div className={cl.BalanceBox}>
            <div className={cl.Balance__text}>
                GGWP Balance:
            </div>
            <div className={cl.Balance__amount}>
                {balance}
            </div>
            <div className={cl.Balance__icon}>
                <GgIcon/>
            </div>
        </div>
    );
};

export default GgwpBalance;