import './css/App.css';
import React, { useState, useEffect } from 'react';

import Chatroom from './components/Chatroom';
import LoginPage from './components/LoginPage';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
/* Your config */
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
