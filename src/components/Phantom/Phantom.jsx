import React from 'react';
import cl from './Phantom.module.css'

const Phantom = () => {
    return (
        <div className={cl.phantom}>
            <div className={cl.phantom__box}>
                <div className={cl.phantom__text}
                >Please install PETRA to continue
                </div>
                <div className={cl.phantom__linc}>
                    <a href="https://petra.app/">Download petra.app</a>
                </div>
            </div>
        </div>
    )
}
export default Phantom;