import React from 'react';
import cl from './MessagesList.module.css'
import Loader from "../Loader/Loader";

const MessagesList = ({messages, remove}) => {

    return (
        <div>
            {messages.map((message, index) =>
                <div
                    key={index}
                >
                    {message.error
                        ? <div
                            className={cl.errorMessage}
                        >
                            Error! {message.text}
                            <button
                                onClick={() => remove(index)}
                            >
                                close
                            </button>
                        </div>
                        : <div
                            className={cl.successfulMessage}
                        >
                            <a
                                title={'View in explorer.solana.com'}
                                target={"_blank"}
                                href={"https://explorer.solana.com/tx/" + message.text + '?cluster=devnet'}
                            >
                                 {message.text}
                            </a>
                            <button
                                onClick={() => remove(index)}
                            >
                                close
                            </button>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default MessagesList;