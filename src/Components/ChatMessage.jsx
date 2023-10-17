


function ChatMessage(props) {
    const {text,uid,photoURL,createdAt,image}=props.message;
    const MessageStyle=uid===props.auth.currentUser.uid ? 'sent' : 'received';
    // console.log(createdAt)
    return  (
      <div className={`message ${MessageStyle}`} style={{ wordBreak: 'break-word' }} >
        <img src={photoURL ||`https://robohash.org/1?size=200x200` }/>
         <p>{text}</p>



         {/* <span className="text-xs">{createdAt}</span>
       */}
      </div>
    )
  }
  


  export default ChatMessage;