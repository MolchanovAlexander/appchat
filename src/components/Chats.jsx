import React from "react";
import Pict from "../img/724.jpg"
const Chats = () => {
    return (
        <div className="chats">
            <div className="userChat">
                <img src={Pict} alt="" />

                <div className="userChatInfo">
                    <span>Alesya</span>
                    <p>Hello last message</p>
                </div>
            </div>
            <div className="userChat">
                <img src={Pict} alt="" />

                <div className="userChatInfo">
                    <span>Alesya</span>
                    <p>Hello last message</p>
                </div>
            </div>
            <div className="userChat">
                <img src={Pict} alt="" />

                <div className="userChatInfo">
                    <span>Alesya</span>
                    <p>Hello last message</p>
                </div>
            </div>
        </div>
    )
}
export default Chats