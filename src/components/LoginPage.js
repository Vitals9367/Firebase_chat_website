import React from 'react'
import '../css/LoginPage.css';

import Button from './Button';
import logo from '../img/google-logo.svg';

import firebase from 'firebase/app';

const LoginPage = ({auth}) => {

    const signInWithGoogle = async() => {
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.useDeviceLanguage();

        try{
            await auth.signInWithPopup(provider);
            console.log('Logged in!');
        }catch(error){
            console.log(error);
        }
    }

    return (
        <main className="login-page">
            <div className="login-panel">
                <h3 className="login-logo" >The Chatroom</h3>                
                <Button onClick={signInWithGoogle} customStyle="login-button" >
                    <div className="login-button-content" > 
                        <img src={logo} className="login-google-icon" alt="Google logo"/>
                        <p style={{fontWeight:600, color:'#595959'}} >Sign In With Google</p>
                    </div>
                </Button>
                <p>Made with React.js and Firebase</p>
            </div>
        </main>
    )
}

export default LoginPage
