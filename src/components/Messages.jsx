import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })
        return () => {
            unSub()
        }

    }, [data.chatId])
 
    return (
        <div className="messages" >

            {data.chatId === "null"? (<h3>
                Choose user for conversation from the lefthand side of the app, find user by search input to start conversation or delete user
                </h3>)
            :( messages.map((m) => (<Message
                 message={m} 
                 key={m.id} /> )))}
           
        </div>
    )
}
export default Messages