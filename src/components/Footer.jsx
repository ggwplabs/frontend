import React from 'react';
import cl from './Footer.module.css'
import {ReactComponent as GGWP} from '../images/Footer/Logo_GGWP_H.svg'
import fb from '../images/Footer/socialNetworks/fb.png'
import insta from '../images/Footer/socialNetworks/insta.png'
import yt from '../images/Footer/socialNetworks/yt.png'
import mail from '../images/Footer/socialNetworks/mail.png'
import tg from '../images/Footer/socialNetworks/telegram.png'

const Footer = () => {
    return (
        <div className={cl.Footer}>
            <div className={cl.Father_box}>
                <div className={cl.First_box}>
                    <GGWP className={cl.Logo}/>
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
                    </ul>
                    <ul className={cl.Menu}>
                        <li>
                            <a href="#"><img src={fb}/></a>
                        </li>
                        <li>
                            <a href="#"><img src={insta}/></a>
                        </li>
                        <li>
                            <a href="#"><img src={yt}/></a>
                        </li>
                        <li>
                            <a href="#"><img src={mail}/></a>
                        </li>
                        <li>
                            <a href="#"><img src={tg}/></a>
                        </li>
                    </ul>
                    <ul className={cl.Menu}>
                        <li>
                            <a href="#"><img src={tg}/></a>
                        </li>
                        <li>
                            <a href="#"><img src={tg}/></a>
                        </li>
                    </ul>
                    <div className={cl.Log__box}>
                        <button className={cl.Log__btn}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className={cl.Father_box}>
                <div className={cl.Second_box}>
                    <div className={cl.Second_box}>
                        <div className={cl.Info_box}>
                            © 2022 «Global Games World Passion»
                            Company No. 07080800
                        </div>
                        <div className={cl.Info_box}>
                            Registered address:

                            113-117 Farringdon Road, London, EC1R 3BX
                            01248 719 254 | info@ggwp.world
                        </div>
                        <div className={cl.Info}>
                            <a href="#"> Privacy Policy </a> |
                            <a href="#"> Terms of Use </a> |
                            <a href="#"> Cookies </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;