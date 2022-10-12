import React from 'react';
import cl from './TabButton.module.css'

const TabButton = ({children, ...props}) => {
    return (
            <button className={cl.Tab__btn} {...props}>
                {children}
            </button>
    );
};

export default TabButton;