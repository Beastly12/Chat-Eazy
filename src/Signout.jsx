
function Signout({auth}) {
   
    return auth.currentUser && (
      <div>
        <button className="sign-out" onClick={()=> auth.signOut()}> Sign Out</button>
  
      
      </div>
    )
  }
  


  export default Signout;