import React from 'react';
import cl from './Epoch.module.css'

const Epoch = ({epoch, isFuture, time, apr}) => {
    return (
        <div className={cl.Epoch_box}>
            <div className={cl.Epoch_title}>
                epoch {epoch}
            </div>
            <div className={cl.Epoch_date}>
                {isFuture
                    ? <div>Start at: </div>
                    : <div>Ended at: </div>
                }
                <div>{new Date(time * 1000).toLocaleDateString("en-US")}</div>
            </div>
            <div>
                <div className={cl.Epoch_apr_text}>apr</div>
                <div className={cl.Epoch_apr_amount}>{apr}%</div>
            </div>
        </div>
    );
};

export default Epoch;