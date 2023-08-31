import React, { useContext } from "react";
import Messages from "./Messages";
import InputPannel from "./InputPannel";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
    const { data } = useContext(ChatContext)
    
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    {data.chatId !== 'null' 
                    ? <button className="chatInfoClose">close</button>
                    : null }
                </div>
            </div>
            <Messages />
            <InputPannel chatId={data.chatId} />
        </div>
    )
}
export default Chat