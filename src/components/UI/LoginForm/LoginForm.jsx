import React from 'react';
import classes from "./LoinForm.module.css"
import LoginButton from "../buttons/LoginButton";

const LoginForm = (props) => {
    return (
        <div>
            <h1>
                Login
            </h1>
            {/*<input*/}
            {/*    className={classes.loginInput}*/}
            {/*    type="text"*/}
            {/*    placeholder="Login"*/}
            {/*/>*/}
            {/*<input*/}
            {/*    className={classes.loginInput}*/}
            {/*    type="text"*/}
            {/*    placeholder="Password"*/}
            {/*/>*/}
            {/*<input*/}
            {/*    className={classes.loginInput}*/}
            {/*    type="text"*/}
            {/*    placeholder="Code fom e-mail"*/}
            {/*/>*/}
            <LoginButton
                onClick={() =>props.connectPhantom()}
            >
                Login with phantom
            </LoginButton>
        </div>
    );
};

export default LoginForm;