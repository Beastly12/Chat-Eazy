import  {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import send from '../assets/send.png'
import React, { useRef, useState } from 'react';


function ChatRoom({firebase,firestore,auth}) {
    

    const messagesRef =firestore.collection('messages');
    const query=messagesRef.orderBy('createdAt').limit(25);

    const [messages]= useCollectionData(query,{idField:'id'});
    const [formValue,setFormValue]=useState('');
    const automateSlide =useRef();

   const sendMessage =async(e)=>{
      // message is sent to the database here

      e.preventDefault();

      const {uid,photoURL}=auth.currentUser;

      await messagesRef.add({
          text:formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          photoURL

      });
      setFormValue('');

      automateSlide.current.scrollIntoView({behavior:'smooth'});


   }


    return  (
      <div>

        {messages && messages.map(msg => <ChatMessage key={msg.id} auth={auth} message={msg} />)}

        <span ref={automateSlide}></span>

        <form>
          <input onChange={(e)=> setFormValue(e.target.value)} value={formValue} />
          <button type="submit" onClick={sendMessage}  ><img src={send}/></button>


        </form>
  
      
      </div>
    )
  }
  


  export default ChatRoom;