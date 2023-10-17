import React from "react";
import { faVideo, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {IoIosArrowBack as IoIosArrowDropleft} from 'react-icons/io';

const ChatSettings=(props) =>{
    return(
            <>
                <div className=" flex flex-col justify-center items-center relative overflow-y-scroll " >
                    <div
                        className="  py-[18px]  sticky  w-full top-0 block md:hidden 
                                                        box-border z-[50] border-b border-gray-500  px-6    "
                        >
                        <div className=" flex items-center gap-20  ">
                            <div className=" items-center flex w-11 ">
                            <button
                                onClick={()=>props.handleGoBack()}
                                className=" cursor-pointer p-0 m-0 transition-transform transparent 
                                                    border-none rounded-[50%] relative outline-none touch-manipulation inline-block   "
                            >
                              <IoIosArrowDropleft className=" text-2xl"/>
                            </button>
                            </div>
                            <div className=" text-lg font-semibold">
                            <h1 className=" text-white "> Contact Info </h1>
                            </div>
                        </div>
                    </div>
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