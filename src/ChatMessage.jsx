


function ChatMessage(props) {
    const {text,uid,photoURL}=props.message;
    const MessageStyle=uid===props.auth.currentUser.uid ? 'sent' : 'received';
   
    return  (
      <div className={`message ${MessageStyle}`}>
        <img src={photoURL ||`https://robohash.org/1?size=200x200` }/>
         <p>{text}</p>
  
      
      </div>
    )
  }
  


  export default ChatMessage;