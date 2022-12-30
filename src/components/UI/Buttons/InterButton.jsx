import React from 'react';
import cl from "./InterButton.module.css";

const InterButton = ({children, ...props}) => {
    return (
        <button className={cl.Button} {...props}>
            {children}
        </button>
    );
};

export default InterButton;