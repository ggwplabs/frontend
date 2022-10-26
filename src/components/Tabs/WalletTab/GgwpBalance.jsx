import React from 'react';
import cl from './GgwpBalance.module.css';
import {ReactComponent as GgIcon} from '../../../images/Tabs/Wallet/GG_coin_icon.svg'
import Loader from "../../UI/Loader/Loader";

const GgwpBalance = ({balance, isLoading, Error}) => {

    return (
        <div>
            {isLoading
                ? <Loader/>
                : <div
                    className={cl.GgwpBalance_box}
                >{Error
                    ? <p>Error</p>
                    : <div className={cl.BalanceBox}>
                        <div className={cl.Balance__text}>
                            GGWP Balance:
                        </div>
                        <div className={cl.Balance__amount}>
                            {balance.toLocaleString('ru-RU')}
                        </div>
                        <div className={cl.Balance__icon}>
                            <GgIcon/>
                        </div>
                    </div>
                }
                </div>
            }
        </div>
    );
};


export default GgwpBalance;