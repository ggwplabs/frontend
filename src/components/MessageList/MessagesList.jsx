import React from 'react';
import cl from './MessagesList.module.css'
import LoaderMessage from "../UI/Loader/LoaderMessage";
import {ReactComponent as Cross} from '../../images/MessageList/Cross.svg';

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
                                className={cl.Button_failed}
                                onClick={() => remove(message.id)}
                            >
                                Close <Cross fill={"#FF8CB5"} />
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
                                className={cl.Button_sucessful}
                                onClick={() => remove(message.id)}
                            >
                                Close <Cross fill={"#00EA88"} />
                            </button>
                        </div>
                    }
                </div>
            )}
        </div>
    );
};

export default MessagesList;