import  {useCollectionData} from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import firebase from 'firebase';
import React, { useRef, useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt,faMicrophone, faImage} from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane as fabPaperPlane } from '@fortawesome/free-brands-svg-icons';
import { SendOutlined } from '@ant-design/icons';
import ChatHeader from './ChatHeader';


// import './PersonalChatRoom.css'



function PersonalChatRoom({firestore,auth,conversationId,receiverName,receiverPhoto,setMenuOpen,handleGoBack}) {
    

    const messagesRef =firestore
    .collection('conversations')
    .doc(conversationId)
    .collection('messages');
    
    const query=messagesRef.orderBy('createdAt').limit(25);

    const [messages]=useCollectionData(query,{idField:'id'});
    const [formValue,setFormValue]=useState('');
    const automateSlide=useRef();
    const imageRef=useRef();
    const [imageInput, setImageInput] = useState(null);

    useEffect(()=>{


      automateSlide.current.scrollIntoView({behavior:'smooth'});




    });



    
  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    setImageInput(URL.createObjectURL(file));
  };



   const sendMessage =async(e)=>{
      // message is sent to the database here

      e.preventDefault();
      
      try{
       const {uid,photoURL}=auth.currentUser;
        await messagesRef.add({
            text:formValue,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            image:imageInput,
            uid,
            photoURL,
            read: false  

        });
        setFormValue('');
        setImageInput('');

    }
    catch(error){
        console.error("error saving Message",error)

    }

      automateSlide.current.scrollIntoView({behavior:'smooth'});


   }

  //  console.log(classes.send)
   let btnClass ='hidden';
   let mapbtnClass='';
   let ImagebtnClass='';
   if (formValue) {
     btnClass = ' inline-block';
     mapbtnClass=' hidden';
     ImagebtnClass=' hidden ';
    //  console.log(classes.send)

   }
 

   


    return  (
      <main className='' >

     
           <div className=' header' >
              <ChatHeader name={receiverName} photo={receiverPhoto} setMenuOpen={setMenuOpen} goBack={handleGoBack}   />

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
            <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageRef}
            onChange={handleImageInputChange}
          />
            <div className={`space-x-2 `} >
              {/* <button className={`pl-0 w-12 rounded-md mb-2 text-center hover:bg-slate-700  overflow-hidden text-indigo-600 bg-transparent text-base  ${btnClass}`}  onClick={sendMessage} >Send</button> */}
              <button className={` w-11 h-11 mt-1 flex items-center justify-center  text-2xl    rounded-lg   hover:bg-gray-800  overflow-hidden text-indigo-600 bg-transparent  ${btnClass} `} onClick={sendMessage}  ><SendOutlined className='  cursor-pointer  ' /></button>
              <FontAwesomeIcon icon={fabPaperPlane} id='send-button' className={`text-gray-500 bg-transparent ${mapbtnClass}`} size="xs"  />
              <FontAwesomeIcon icon={faMapMarkerAlt} id='map-button' className={`text-gray-500 bg-transparent ${mapbtnClass} `}  size="xs" />
              <FontAwesomeIcon icon={faImage} id='image-button' className={`text-gray-500 hover:text-indigo-600 bg-transparent cursor-pointer  ${ImagebtnClass} `} size="xs" onClick={() => imageRef.current.click()} />
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
  