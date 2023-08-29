import React, { useState } from 'react';


function SignIn({firebase,auth}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmpty,setIsEmpty]= useState(false)

  const handleEmailChange=(event)=>{
   
    setEmail(event.target.value);


  }

  const handlePasswordChange=(event)=>{

    setPassword(event.target.value);
  }

  const SignInWithGoogle = async () => {
    const firestore = firebase.firestore();
    const Googleprovider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(Googleprovider);
      const user = result.user;
      // console.log(result);
      if (user) {
        const userRef = firestore.collection('users').doc(user.uid);
        await userRef.set(
          {
            id:user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            recentChats: [], 
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };



    // const SignInwithEmailandPassword=(event)=>{
    //   event.preventDefault();

    //   {email&&password ? GosignIn: setIsEmpty(true)}




    //  const GosignIn =firebase.auth.signInWithEmailAndPassword(email, password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log('Signed in as :', user);
    //   })
    //   .catch((error) => {
    //     console.error('Error signing in:', error);
    //   });

    // }


  
    return (
      <div>

        {/* <h2>Sign In</h2>
        <form onSubmit={SignInwithEmailandPassword}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={handlePasswordChange} required />  
          </label>
          <br />
          {isEmpty ? <div><label>Fields can't be left Empty</label></div>: null }
          <button className='sign-in' type="submit">Sign In</button>
        </form> */}

        <button className="sign-in" onClick={SignInWithGoogle}> SignIn in with Google</button>
  
      
      </div>
    )
  }
  


  export default SignIn;



  // USERS COLLECTION
  // {
  //   "id": "user_id",            
  //   "username": "john_doe",      
  //   "email": "john@example.com", 
  //   "avatar": "avatar_url",      
  //   "status": "online",          
  //   "last_seen": ISODate("2023-07-31T10:00:00Z"), 
  //   "recent_chats": ["user_id1", "user_id2", ...],   
  //   "blocked_users": ["user_id3", ...]          
  // }