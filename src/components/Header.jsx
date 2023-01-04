import React from 'react';
import cl from './Header.module.css'
import {ReactComponent as GGWP} from '../images/Header/GGWP.svg'

const Header = ({isLogin, func}) => {
    const buttonText = isLogin ? "Logout" : "Login"
    return (
        <div className={cl.Header}>
            <div className={cl.Menu__box}>
                    <GGWP/>
                <ul className={cl.Menu}>
                    <li>
                        <a href="#"> nft's </a>
                    </li>
                    <li>
                        <a href="#"> staking </a>
                    </li>
                    <li>
                        <a href="#"> game center </a>
                    </li>
                    <li>
                        <a href="#"> white paper </a>
                    </li>
                    <li>
                        <a href="#"> faq </a>
                    </li>
                    <li>
                        <a href="#"> community </a>
                    </li>
                    <li>
                        <a href="#"> aptos </a>
                    </li>
                </ul>
                <button
                    className={cl.Login__btn}
                    onClick={func}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default Header;