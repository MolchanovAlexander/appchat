import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import MessagePhotoFullScreen from "./MessagePhotoFullScreen";
dayjs.extend(relativeTime)

const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)
    let [fullScreenView, setFullScreenView] = useState(false)
    const toggleFullScreen = () => {
         setFullScreenView(!fullScreenView) 
    }
const ref = useRef()


useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
}, [message])

return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
            <img src={
                message.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL}
                alt="" />
            <span>{dayjs.unix(message.date.seconds).from(dayjs())}</span>
        </div>
        <div className="messageContent">

            {message.img && <img onClick={toggleFullScreen} src={message.img} alt="" />}
            <p>{message.text}</p>
        </div>
        {fullScreenView && <MessagePhotoFullScreen fullScr = {toggleFullScreen} img={message.img} />}
    </div>
)
}
export default Message