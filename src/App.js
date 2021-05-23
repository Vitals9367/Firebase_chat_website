import './css/App.css';
import React, { useState, useEffect } from 'react';

import Chatroom from './components/Chatroom';
import LoginPage from './components/LoginPage';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAdxGfAAB6bsdv-YSk1RS08vx1dt0Q9zB0",
  authDomain: "chatapp-7c5ea.firebaseapp.com",
  projectId: "chatapp-7c5ea",
  storageBucket: "chatapp-7c5ea.appspot.com",
  messagingSenderId: "324822723792",
  appId: "1:324822723792:web:503ca95a687266bc5582d5"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  
  const [user,setUser] = useState(()=> auth.currentUser);
  const [initializing,setInitializing] = useState(false);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged( user => {
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }

      if(initializing)
        setInitializing(false);

    })

    return unsubscribe;

  });

  if(initializing)
    return ("Loading...")

  return (
    <div className="App">
      {user
      ? (<Chatroom user={user} firestore={firestore} />)
      : (<LoginPage auth={auth} />)
      }
    </div>
  );
}

export default App;
