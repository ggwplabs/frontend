import React from 'react';
import cl from './MadalWindow.module.css'


const ModalWindow = ({children, visible, setVisible}) => {
    const rootClasses = [cl.ModalWindow]
    if (visible) {
        rootClasses.push(cl.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.ModalWindowContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;