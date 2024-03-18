import { useState } from 'react';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Chats(props) {
  return ( 
    <div className="chat-sidebar">
        <button className='button' onClick={props.NewChat}><p>Start a new chat</p><i class="fa-solid fa-pen-to-square"></i></button>
          {props.chats && props.chats.map((chat, i) => {
              const chatName = chat.messages[0] && chat.messages[0].message ? chat.messages[0].message : "";
              return (
                <div>
                  {chatName != "" ?
                  <button className='chats-name' key={i} onClick={() => props.handleChatClick(chat)}>
                    {chatName}
                  </button>
                  : null}
                </div>
              );
            })}
    </div>
          );
}

export default Chats;