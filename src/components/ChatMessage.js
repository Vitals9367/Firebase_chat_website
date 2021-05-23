import React from 'react'
import '../css/ChatMessage.css';
import { formatRelative } from 'date-fns';

const ChatMessage = (props) => {

    const message = props.message;

    return (
        <div className={props.customStyle}>
            <img className="chat-message-img" src={message.photoURL} alt={message.displayName}/>
            <div className="chat-message-column" >
                <p className="chat-message-text" >{message.text && message.text}</p>
                <span className="chat-message-date" >{message.createdAt && formatRelative(new Date(message.createdAt.seconds * 1000),new Date())}</span>
            </div>
        </div>
    )
}

export default ChatMessage
