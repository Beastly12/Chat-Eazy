import React from "react";
import { faVideo, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChatHeader = (props) => {
    return (
        <div  className="flex items-center justify-between p-5 h-[70px]   border-gray-700 space-x-2   " >
            <div className="flex items-center space-x-4">
                <img className="w-12 h-12 rounded-full object-cover " src={props.photo || 'https://robohash.org/1?size=200x200'} alt="User" />
                <div className=" ">
                    <h3 className="text-lg font-semibold text-gray-400">{props.name}</h3>
                    <h2 className="text-sm text-green-500 text-left">Typing...</h2>
                </div>
            </div>
            <div className="flex h-full items-center gap-2 space-x-2 ">
                <FontAwesomeIcon icon={faPhone} className="text-gray-500 bg-transparent"  />  
                <FontAwesomeIcon icon={faVideo} className="text-gray-500 bg-transparent"  /> 
                <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-500 pr-1 bg-transparent"  />
            </div>
        </div>
    );
}

export default ChatHeader;
