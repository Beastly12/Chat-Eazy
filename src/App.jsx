import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import  {useAuthState} from 'react-firebase-hooks/auth';
import './App.css'
import SignIn from './SignIn';
import ChatRoom from './Components/ChatRoom';
import Signout from './Signout';
import ChatMain from './Controller/ChatMain';


firebase.initializeApp({
  apiKey: import.meta.env.VITE_REACT_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID



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
