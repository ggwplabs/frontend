import React from 'react';
import cl from './TabButton.module.css'

const TabButton = ({children, isNFT, ...props}) => {
    if (isNFT){
        return (
            <button  {...props}>
                {children}
            </button>
        );
    } else {
        return (
            <button className={cl.Tab__btn} {...props}>
                {children}
            </button>
        );
    }
};

export default TabButton;