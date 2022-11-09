import React, {useState} from 'react';
import cl from "./Convertor.module.css";
import {ReactComponent as GgIconLittle} from "../../../images/Tabs/Wallet/GG_coin_icon_little.svg";
import CustomSelect from "../../UI/CustomSelect/CustomSelect";

const Convertor = ({items, currency, setCurrency}) => {

    return (
        <div className={cl.Box}>
            <div className={cl.Convertor_box}>
                <div className={cl.Token_balance_box}>
                    <div className={cl.Token_balance}>
                        1
                    </div>
                    <div className={cl.Token_logo}>
                        <GgIconLittle/>
                    </div>
                </div>
                <div className={cl.Equal_box}>
                    =
                </div>
                <div className={cl.Currency_box}>
                    <div className={cl.Currency}>
                        {currency.value}
                    </div>
                    <div>
                        <CustomSelect
                            items={items}
                            selectedItem={currency}
                            setSelectedItem={setCurrency}
                        />
                    </div>
                </div>
            </div>
            <div className={cl.Info}>
                how to buy GGWP
            </div>
        </div>
    );
};

export default Convertor;