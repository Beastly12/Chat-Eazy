import Chat from "./Chat";
import  {useCollectionData} from 'react-firebase-hooks/firestore';
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Empty } from 'antd';


function Chats(props) {
  
  // const messagesRef =firestore.collection('messages');
  // const query=messagesRef.orderBy('createdAt').limit(25);
  // const [messages]= useCollectionData(query,{idField:'id'});

  const auth =firebase.auth();
  const firestore=firebase.firestore();
 

  


 





 
	const chatArray = props.users.map((user,i)=>{
    // console.log(user)

		return (
        <Chat key={i} 
        PhotoUrl={user.PhotoUrl} 
        text={'Click to start chatting with the president of gambia'} 
        userName={user.displayName} 
        click={props.click} 
        uId={user.id}  
        userEmail={user.email}
        />
    )

	})

 

  


   
    return auth.currentUser && (
      <div>
        
        
        {props.users ? chatArray : <Empty />
        
        
        
        
        }
              
      </div>
    )
  }
  


  export default Chats;




  // <Link to={{
  //   pathname: '/target',
  //   state: { data } // Pass your props here
  // }}>




  // auth.listUsers().then((userRecords) => {
  //   userRecords.users.forEach((user) => {
  //     console.log(user.email);
  //   });
  // }).catch((error) => {
  //   console.log('Error fetching user data:', error);
  // });










