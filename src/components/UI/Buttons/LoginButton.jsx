import React from 'react';
import cl from './LoginButton.module.css'

const LoginButton = ({children, ...props}) => {
    return (
        <div className={cl.LoginBox}>
            <button className={cl.Login__btn} {...props}>
                {children}
            </button>
        </div>
    );
};

export default LoginButton;