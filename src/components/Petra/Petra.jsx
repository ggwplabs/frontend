import React from 'react';
import cl from './Petra.module.css'

const Petra = () => {
    return (
        <div className={cl.petra}>
            <div className={cl.petra__box}>
                <div className={cl.petra__text}
                >Please install PETRA to continue
                </div>
                <div className={cl.petra__linc}>
                    <a href="https://petra.app/">Download petra.app</a>
                </div>
            </div>
        </div>
    )
}
export default Petra;