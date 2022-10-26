import React from 'react';
import cl from './MessagesList.module.css'
import LoaderMessage from "../UI/Loader/LoaderMessage";

const MessagesList = ({messages, remove, isLoading}) => {

    return (
        <div className={cl.messges_box}>
            {isLoading
                ? <LoaderMessage/>
                : <div/>
            }
            {messages.map((message) =>
                <div key={message.id}>
                    {message.error
                        ? <div
                            className={[cl.message, cl.error].join(' ')}
                        >
                            Error! {message.text}
                            <button
                                onClick={() => remove(message.id)}
                            >
                                close
                            </button>
                        </div>
                        : <div
                            className={[cl.message, cl.successful].join(' ')}
                        >
                            <a
                                title={'View in explorer.solana.com'}
                                target={"_blank"}
                                href={"https://explorer.solana.com/tx/" + message.text + '?cluster=devnet'}
                            >
                                {message.text}
                            </a>
                            <button
                                onClick={() => remove(message.id)}
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