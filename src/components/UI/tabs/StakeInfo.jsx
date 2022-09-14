import React from 'react';

const StakeInfo = ({stakeInfo}) => {
    return (
        <div>
            <p>
                Staking balance: {stakeInfo.amount}
            </p>
            <p>
                Start staking
            </p>
            <p>
                date: {stakeInfo.date}
            </p>
            <p>
                time: {stakeInfo.time}
            </p>
        </div>
    );
};

export default StakeInfo;