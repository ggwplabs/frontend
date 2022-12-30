import React from 'react';
import cl from './ActualEpoch.module.css'

const ActualEpoch = ({epoch, start, end, apr}) => {
    return (
        <div className={cl.ActualEpoch_box}>
            <div className={cl.ActualEpoch_title}>today.epoch {epoch}</div>
            <div className={cl.ActualEpoch_date}>{new Date(start * 1000).toLocaleDateString("en-US")} - {new Date(end * 1000).toLocaleDateString("en-US")}
            </div>
            <div className={cl.ActualEpoch_apr_text}>apr</div>
            <div className={cl.ActualEpoch_apr_amount}>{apr}%</div>
        </div>
    );
};

export default ActualEpoch;