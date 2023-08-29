import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import  {useAuthState} from 'react-firebase-hooks/auth';
import './App.css'
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';
import Signout from './Signout';
import ChatMain from './ChatMain';


firebase.initializeApp({
  apiKey: "AIzaSyBG6aXPl8putJaK9cNd36aSXnKF9eYcPow",
  authDomain: "chateazy-81e2f.firebaseapp.com",
  projectId: "chateazy-81e2f",
  storageBucket: "chateazy-81e2f.appspot.com",
  messagingSenderId: "416166048381",
  appId: "1:416166048381:web:eefe15831ff65fa2577714",
  measurementId: "G-HMB2WC8J64"



});

const auth =firebase.auth();
const firestore=firebase.firestore();









function App() {
  
  const [user]=useAuthState(auth);
  return (
    <div className='App  '>
      {/* <header>
            <h1>World chat 🌐🌍</h1>
              <Signout auth={auth} />
      </header> */}

      <section>
        {user ? <ChatMain firestore={firestore} firebase={firebase} auth={auth} />: <SignIn firebase={firebase} auth={auth} />}
        
      </section>

    
    </div>
  )
}

export default App;


// <ChatRoom firestore={firestore} firebase={firebase} auth={auth} />
