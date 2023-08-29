import React from "react";
import { faVideo, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatSettings=(props) =>{
    return(
            <>
                <div>
                    <img className="w-20 h-20 rounded-full object-cover " src={props.photo || 'https://robohash.org/1?size=200x200'} alt="User" />
                    <p>{props.name}</p>
                    <p>{props.userEmail}</p>
                    {/* <div className="flex h-full items-center justify-center gap-2 space-x-2 ">
                        <FontAwesomeIcon icon={faPhone} className="text-gray-500 bg-transparent"  />  
                        <FontAwesomeIcon icon={faVideo} className="text-gray-500 bg-transparent" /> 
                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-500 pr-1 bg-transparent"  />
                    </div> */}
                </div>




            </>
    );
}

export default ChatSettings;