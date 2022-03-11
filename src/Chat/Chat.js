import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket,username,room}) => {
    const [currentMessage,setCurrentMessage]=useState("")
    const [messageList,setMessageList]=useState([])
    const sendMessage=async()=>{
        if(currentMessage!==""){
            const messageData={
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes()
            }      
            
            await socket.emit("send_message",messageData)
            setMessageList((list)=>[...list,messageData]);
        };
    };

    useEffect(()=>{

socket.on("receive_message",(data)=>{
    setMessageList((list)=>[...list,data]);
    setCurrentMessage("")

})
    },[socket])
    return (
        <div>
            <h1>This is Chat Section</h1>
            <div className='header'>Live Chat</div>
            <div className='body'>
               <ScrollToBottom>
               {
                messageList.map(messageContent=>{
                    return <div className='message' id={username=== messageContent.author ? "you" : "other"}>
                        <div>
                            <div className='mesageContent'>
                                <p>{messageContent.message}</p>
                            </div>
                            <div className='messageMeta'>
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                })
            }
               </ScrollToBottom>
            </div>
            <div className='footer'>
                <input type="text" placeholder='Hey....' value={currentMessage} onChange={(event)=>{
                    setCurrentMessage(event.target.value)
                }} onKeyPress={(event)=>{event.key =="Enter" && sendMessage()

                }} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
};

export default Chat;