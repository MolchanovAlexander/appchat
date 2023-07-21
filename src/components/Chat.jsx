import React, { useContext } from "react";
import Cam from "../img/in_f.svg"
import Add from "../img/twiter_f.svg"
import More from "../img/youtoube_f.svg"
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
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages/>
            <InputPannel />
        </div>
    )
}
export default Chat