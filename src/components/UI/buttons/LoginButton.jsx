import React from 'react';
import classes from './LoginButton.module.css'

const LoginButton = ({children, ...props}) => {
    return (
        <div>
            <button {...props} className={classes.logBtn}>
                {children}
            </button>
        </div>
    );
};

export default LoginButton;