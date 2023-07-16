import React from "react";
import Pict from "../img/724.jpg"
const Search = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="find dniwe" />

            </div>

            <div className="userChat">
                <img src={Pict} alt="" />            

            <div className="userChatInfo">
                <span>Alesya</span>
            </div>
            </div>


        </div>
    )
}
export default Search