import React from 'react';
import cl from "./BuyGgwp.module.css";
import {ReactComponent as Arrow} from "../../../images/Tabs/Wallet/arrow.svg";

const BuyGgwp = ({currency, links}) => {
    return (
        <div className={cl.Links_box}>
            <div className={cl.Buy_GGWP}>
                buy GGWP
                {/*<div className={cl.Exchange}>*/}
                {/*    <div className={cl.Name}>GGWP/{currency.name}</div>*/}
                {/*    <div className={cl.Value}>{currency.value}</div>*/}
                {/*</div>*/}
            </div>
            {links.map((link) =>
                <div
                    key={link.name}
                    className={cl.Link}>
                    <a href={link.ref}>{link.name}</a>
                    <Arrow/>
                </div>
            )}
        </div>
    );
};

export default BuyGgwp;