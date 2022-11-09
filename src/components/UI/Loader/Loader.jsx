import React from 'react';
import cl from './Loader.module.css'

const Loader = () => {
    return (
        <div className={cl.loader}>
            loading blockchain data
        </div>
    );
};

export default Loader;