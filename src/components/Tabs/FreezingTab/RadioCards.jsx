import React, {useState} from 'react';
import cl from './RadioCards.module.css'
import {ReactComponent as Gpass} from '../../../images/Tabs/g_pass_logo.svg'
import InterButton from "../../UI/Buttons/InterButton";

const RadioCards = ({create, setAmount}) => {
    const [value, setValue] = useState(1)
    const items = [
        {id: 1, gpass: 5,  ggwp: 1000, color: '#5DDFA5'},
        {id: 2, gpass: 10, ggwp: 2000, color: '#12D6C2'},
        {id: 3, gpass: 15, ggwp: 3000, color: '#1E5FDF'},
        {id: 4, gpass: 20, ggwp: 4000, color: '#147EFF'},
        {id: 5, gpass: 25, ggwp: 4800, color: '#FFCB14'},
    ]


    return (
        <div className={cl.Radio_box}
        >
            {items.map(item => (
                    <div
                        key={item.id}
                        onClick={() => {setValue(item.id); setAmount(item.ggwp)}}
                        className={cl.Item}
                        style={{
                            borderColor: item.color,
                            color: item.id === value ? "#fff" : item.color,
                            backgroundColor: item.id === value ? item.color : "#fff"
                        }}
                    >
                        <div className={cl.Level}>
                            <div
                                className={cl.Circle}
                                style={{
                                    borderColor: item.id === value ? "#fff" : item.color,
                                    backgroundColor: item.id === value ? item.color : "#fff"
                                }}
                            />
                            level {item.id}
                        </div>
                        <div className={cl.Text}>
                            {item.ggwp} of frozen ggwp
                        </div>
                        <div className={cl.Gpass}>
                            <div className={cl.Amount}>{item.gpass}</div>
                            {item.id === value
                                ? <Gpass fill={"#fff"} />
                                : <Gpass fill={item.color} />
                            }
                        </div>
                        <div className={cl.Info} >you will received once in 24 hours</div>
                    </div>
                )
            )}
            <InterButton
                onClick={create}
            >
                freezing
            </InterButton>
        </div>
    );
}

export default RadioCards;