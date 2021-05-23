import React, {useEffect, useState, useRef} from 'react'
import '../css/Chatroom.css';

import ChatMessage from './ChatMessage';
import Button from './Button';

import { Send } from 'react-feather';

import firebase from 'firebase/app';

const Chatroom = ({ user = null, firestore = null}) => {

    const dummy = useRef();

    const [messages,setMessages] = useState([]);
    const [newMessage,setNewMessage] = useState('');

    const { uid, displayName, photoURL } = user;

    useEffect(() => {
        const unsub = firestore
        .collection('messages')
        .orderBy('createdAt','asc')
        .limit(100)
        .onSnapshot(snap => {
            const data = snap.docs.map( doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMessages(data);
            dummy.current.scrollIntoView();
        });

        return () => unsub();

    }, [firestore]);

    const handleOnChange = e => {
        setNewMessage(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();

        firestore.collection('messages').add({
            text: newMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            displayName,
            photoURL
        })

        setNewMessage('');

        dummy.current.scrollIntoView();

    }

    const signOut = async() => {
        try{
            await firebase.auth().signOut();
            console.log('Logged out!');
        }catch(error){
            console.log(error.message);
        }
    }


    return (
        <div className="chatroom-page">
            <header className="nav">
                <h3 className="nav-logo">The Chatroom</h3>
                <Button onClick={signOut} customStyle="logout-button" >Sign out</Button>
            </header>
            <main className="chatroom">
                <div className="chatroom-chat">
                    <p>Welcome to the chat!</p>
                    {messages && messages.map(msg => {

                        if(uid === msg.uid)
                            return <ChatMessage key={msg.id} message={msg} customStyle="chat-message-right" />
                        else
                            return <ChatMessage key={msg.id} message={msg} customStyle="chat-message-left" />
                    })}
                    <span ref={dummy}></span>

                </div>
                <form onSubmit={handleOnSubmit} className="chatroom-form" >
                    <input type="text" value={newMessage} onChange={handleOnChange} placeholder="Type your message here..." />
                    <button type="submit" className="send-button" disabled={!newMessage}>Send <Send size={18} strokeWidth="1.5" /></button>
                </form>
            </main>
        </div>
    )
}

export default Chatroom
