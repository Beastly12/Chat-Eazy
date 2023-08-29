import  {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import firebase from 'firebase';
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane, faMapMarkerAlt,faMicrophone, faImage} from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane as fabPaperPlane } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane as farPaperPlane } from '@fortawesome/free-regular-svg-icons';
import ChatHeader from './ChatHeader';
import classes from './PersonalChatRoom.css?inline';
// import './PersonalChatRoom.css'



function PersonalChatRoom({firestore,auth,conversationId,receiverName,receiverPhoto}) {
    

    const messagesRef =firestore
    .collection('conversations')
    .doc(conversationId)
    .collection('messages');
    
    const query=messagesRef.orderBy('createdAt').limit(25);

    const [messages]=useCollectionData(query,{idField:'id'});
    const [formValue,setFormValue]=useState('');
    const automateSlide=useRef();

   const sendMessage =async(e)=>{
      // message is sent to the database here

      e.preventDefault();
      
      try{
       const {uid,photoURL}=auth.currentUser;
        await messagesRef.add({
            text:formValue,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL,
            read: false  

        });
        setFormValue('');

    }
    catch(error){
        console.error("error saving Message",error)

    }

      automateSlide.current.scrollIntoView({behavior:'smooth'});


   }

  //  console.log(classes.send)
   let btnClass ='';
   let mapbtnClass='';
   let ImagebtnClass='';
   if (formValue) {
     btnClass = ' text-blue-500 rounded-full bg-slate-50 rotate-45  ';
     mapbtnClass=' hidden';
     ImagebtnClass=' hidden ';
    //  console.log(classes.send)

   }
 

   


    return  (
      <main className='' >

     
           <div className=' header' >
              <ChatHeader name={receiverName} photo={receiverPhoto}   />

            </div>

       
        
              {messages && messages.map(msg => <ChatMessage key={msg.id} auth={auth} message={msg} />)}
              <span ref={automateSlide}></span>

         
     

        <form className="flex items-center space-x-2">
              <div>
                <FontAwesomeIcon icon={faMicrophone} className="text-gray-500 bg-transparent" size="xs" />
              </div>
              <input
                onChange={(e) =>
                  setFormValue(e.target.value)}
                value={formValue}
                className="rounded-lg p-2 text-base text-gray-300 flex-grow bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="write a message"
              />
            <div className={`space-x-2 `} >
              <FontAwesomeIcon icon={fabPaperPlane} id='send-button' className={`text-gray-500 bg-transparent ${btnClass}`} size="xs" onClick={sendMessage} />
              <FontAwesomeIcon icon={faMapMarkerAlt} id='map-button' className={`text-gray-500 bg-transparent ${mapbtnClass} `}  size="xs" />
              <FontAwesomeIcon icon={faImage} id='image-button' className={`text-gray-500 bg-transparent  ${ImagebtnClass} `} size="xs" />
            </div>
   
      </form>
  
      
      </main>
    )
  }
  


  export default PersonalChatRoom;








//   {
//     "_id": "message_id",         // Unique ID for the message
//     "conversation_id": "conversation_id", // ID of the conversation the message belongs to
//     "sender": "user_id1",       // User ID of the message sender
//     "recipient": "user_id2",    // User ID of the message recipient
//     "content": "Hello there!", // Content of the message (textual part of the message)
//     "media_type": "image",      // Type of media attachment ("image", "video", "audio", etc.)
//     "media_url": "media_url",   // URL to the media attachment file
//     "thumbnail_url": "thumbnail_url", // URL to the thumbnail image (for images and videos)
//     "timestamp": ISODate("2023-07-31T14:00:00Z"), // Timestamp of message sending
//     "read": false               // Boolean indicating whether the message has been read by the recipient
//   }
  