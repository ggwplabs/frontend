import React from 'react';
import cl from './MadalWindow.module.css'


const ModalWindow = ({children, visible, setVisible1, setVisible2, flag, setFlag}) => {
    const rootClasses = [cl.ModalWindow]
    if (visible) {
        rootClasses.push(cl.active)
    }

    const close = () => {
        setVisible1(false)
        setVisible2(false)
        setFlag(!flag)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => close()}>
            <div className={cl.ModalWindowContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;