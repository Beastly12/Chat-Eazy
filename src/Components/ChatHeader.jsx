import React from "react";
import { faVideo, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown,Space,Button } from "antd";
import {IoIosArrowBack as IoIosArrowDropleft} from 'react-icons/io';

const ChatHeader = (props) => {
    return (
        <div  className="flex items-center justify-between p-5 h-[70px] relative   border-gray-700 space-x-2   " >
            <div className=" absolute left-1 block  md:hidden     "  onClick={()=>props.goBack()} ><IoIosArrowDropleft className=" text-base text-white "/></div>

            <div className="flex items-center space-x-4" onClick={()=>props.setMenuOpen()}>
                <img className="w-12 h-12 rounded-full object-cover " src={props.photo || 'https://robohash.org/1?size=200x200'} alt="User" />
                <div className=" ">
                    <h3 className="md:text-lg text-base font-semibold text-gray-400">{props.name}</h3>
                    <h2 className="md:text-sm text-xs text-green-500 text-left">Typing...</h2>
                </div>
            </div>
            <div className="flex h-full items-center gap-2 space-x-2 ">
                <FontAwesomeIcon icon={faPhone} className="text-gray-500 bg-transparent"  />  
                <FontAwesomeIcon icon={faVideo} className="text-gray-500 bg-transparent"  /> 
                <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-500 pr-1 bg-transparent md:block hidden"  />
            </div>
        </div>
    );
}

export default ChatHeader;






function MyDropdown({ }) {
    
  

    const items = [

        
        
    ];
      








    return (
      <Dropdown trigger={['click']}
      autoAdjustOverflow={false}
      onOpenChange={handleSubmit}
      open={visible}
   
     
      dropdownRender={(menu) => (
        <div className=' bg-white' >
          
          <Space
            
            className='p-6  flex-col w-full shadow-md'
          >
             {items}
            <Button  className='bg-orange-700' type="primary" onClick={handleSubmit}>Click me!</Button>
          </Space>
        </div>
      )}
      
      >
        <Space>

           <button type='button' className=' block m-4 cursor-pointer overflow-hidden text-ellipsis text-start whitespace-nowrap text-base font-normal      '>1 traveler 2 pets </button>  
        </Space>
                            
      </Dropdown>
    );
  }
