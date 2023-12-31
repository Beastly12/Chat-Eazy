import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import  {useCollectionData} from 'react-firebase-hooks/firestore';
import 'firebase/firestore';
import Chats from '../Components/Chats';
import Scroll from "../hoc/Scroll";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import PersonalChatRoom from '../Components/PersonalChatRoom';
import ChatSettings from '../Components/ChatSettings';
import MessagesSkeleton from '../Components/MessagesSkeleton';



function ChatMain({firebase,firestore,auth}) {
  const [userList, setUserList] = useState([]);
  const [searchField,setSearchField]=useState('');
  const [conversationId, setConversationId] = useState(null);
  const [receiverName,setReceiverName]=useState(null);
  const [receiverPhoto,setReceiverPhoto]=useState(null);
  const [receiverEmail,setReceiverEmail]=useState(null);
  const [recentChats,setRecentChats]=useState([]);
  const [menuOpen,setMenuOpen]=useState(false);
  const [chatOpen, setChatOpen]=useState(false);
  



  // const query=usersRef.orderBy('displayName').limit(25);

  // const [users]= useCollectionData(query,{idField:'id'});
  // console.log(users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore.collection('users').get();
        const users = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // console.log(users);
  
        setUserList(users);
  
        const currentUserID = auth.currentUser.uid;
        const currentUserDoc = await firestore.collection('users').doc(currentUserID).get();
        const recentChats = currentUserDoc.data().recentChats || [];
  
        const filteredUsers = users.filter((user) => recentChats.includes(user.id));
        setRecentChats(filteredUsers);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUsers();
  }, []);
  



 








  




  // Remember to refractor the code so that the conversation collection is created 
  // when the send button is clicked instead of when the user stuff is clicked

  const userClicked=async(receiverId,receiver_name,receiver_url,receiver_email)=>{
  
    try {
       const currentUserID = auth.currentUser.uid;

       // Query to check if a conversation exists between the current user and the receiver
        // const existingConversations = await firestore.collection('conversations')
        // .where('participants', 'array-contains', currentUserID)
        // .where('participants', 'array-contains', receiverId)
        // .get();

        const currentUserConversationsRef = firestore.collection('conversations')
          .where('participants', 'array-contains', currentUserID);

      const currentUserConversationsSnapshot = await currentUserConversationsRef.get();


      const existingConversations = currentUserConversationsSnapshot.docs.filter(doc => {
          const participants = doc.data().participants;
          // console.log(participants.includes(receiverId));
          return participants.includes(receiverId) && currentUserID!=receiverId;
      });


     
      if (existingConversations.length > 0) {   
        // If a conversation already exists, update necessary information
        const existingConversation = existingConversations[0];
        setConversationId(existingConversation.id);
      } else {
        const conversationsRef = firestore.collection('conversations').doc();
        // DONT FORGET TO PASS ConversationID as a prop to PersonalChatRoom 
        await conversationsRef.set(
          {
            id:conversationsRef.id ,     // Unique ID for the conversation
            participants: [currentUserID,receiverId], // Array of user IDs in the conversation
            createdAt:firebase.firestore.FieldValue.serverTimestamp(), // Timestamp of conversation creation
            lastActivity:firebase.firestore.FieldValue.serverTimestamp(), // Timestamp of the last message in the conversation
            unreadCount: 0
          },
          { merge: true }
        );

        addToRecentChats(receiverId,currentUserID);
      }

        setReceiverName(receiver_name);
        setReceiverPhoto(receiver_url);
        setReceiverEmail(receiver_email)
        openChat();
      
    } catch (error) {
      console.error('Error Creating collection:', error);
    }


    // console.log("user clicked")





  }

  //adds a user to the recentChats  object in the Sender and Receiver user field in Firestore
  const addToRecentChats = async (receiver, currentUser) => {
    const receiverRef = firestore.collection('users').doc(receiver);
    const currentRef = firestore.collection('users').doc(currentUser);
  
    try {
      // Update the recentChats array of the receiver
      await receiverRef.update({
        recentChats: firebase.firestore.FieldValue.arrayUnion(currentUser),
      });
  
      // Update the recentChats array of the current user
      await currentRef.update({
        recentChats: firebase.firestore.FieldValue.arrayUnion(receiver),
      });
  
      console.log("Added to recent chats for users");
  
    } catch (error) {
      console.error("Error adding to recent chats for users", error);
    }
  }
  





 const filteredUsers =userList.filter(user =>{
  // console.log(user)
  return user.displayName.toLowerCase().trim().replace(/\s+/g, '').includes(searchField.toLowerCase());
    

  });	

  // Mobile logic 

  const openUserInfo=()=>{
    setMenuOpen(!menuOpen);


  }

  const openChat=()=>{
    setChatOpen(!chatOpen)


  }


 


  const onSearchChange=(event)=>{
    setSearchField(event.target.value);


 }



  return (
    <div className=' flex xl:flex xl:flex-wrap xl:flex-row h-full'>
      
       <div id='messages-div' className={`md:w-[30%] md:block w-full  h-full pt-4 side ${
          chatOpen ? ' hidden ' : 'block'
        }   `}>
        
          <p  className="text-2xl pl-6 md:pl-0 font-semibold text-left" >Messages</p>
          <Scroll>
          <div className="flex items-center relative rounded mt-2 pr-14 pl-3 pb-4 pt-2">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 ml-2 absolute" size='xs'/>
              <input
                type="search"
                className="flex-1 rounded text-slate-50  h-10 outline-none px-7 bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search Chats"
                onChange={onSearchChange}
              />
          </div>
         <Chats users={searchField ? filteredUsers : recentChats} click={userClicked} />
          {/* {!searchField && <Chats users={recentChats} click={userClicked} />    }  */}
          {/* {!searchField && !recentChats  ? <MessagesSkeleton />  : null } */}
          </Scroll>
       </div>
       

       <div id='chatroom-div' className={` md:w-[50%] w-full h-full md:block  ${
          chatOpen&&!menuOpen ? ' block ' : 'hidden'
        } `}>
       {conversationId && (
        
          <PersonalChatRoom
            firestore={firestore}
            auth={auth}
            conversationId={conversationId} // Pass the conversationId as a prop
            receiverName={receiverName}
            receiverPhoto={receiverPhoto}
            setMenuOpen={openUserInfo}
            handleGoBack={openChat}
          />


          
        )}

       </div>

       <div id='settings-div' className={`md:w-[20%] md:block w-full h-full  ${
          menuOpen ? ' block ' : 'hidden'
        }   `}>
         <ChatSettings name={receiverName} photo={receiverPhoto} userEmail={receiverEmail} handleGoBack={openUserInfo} />
       </div>
         
        
    
    </div>
  );
}

export default ChatMain;






 