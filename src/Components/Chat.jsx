import './Chat.css'





function Chat({userName,PhotoUrl,text,click,uId,userEmail}) {
  const preView=text.substring(0,28);
   
    return (
      <div className="chat-item  " onClick={() => click(uId,userName,PhotoUrl,userEmail)} >
        <img className="profile-picture" src={PhotoUrl ||`https://robohash.org/1?size=200x200` } alt="User" />
        <div className="chat-content ">
          <div className="chat-header ">
              <h3 className="user-name">{userName}</h3>
              
              <p className="preview">{preView}</p>
             
             
          </div>
          <div className='w-[50%] chat-time ' >
         
           <h3 className='time-stamp'>18:00 PM</h3>
                <span className='unread'>3</span>
               
            
          </div>
        </div>
    </div>
    )
  }
  


  export default Chat;