import React, { useState } from "react";
import Pict from "../img/724.jpg"
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
    const [userName, setUserName] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)

    const handleSearch = async () => {
        const q = query(collection(db, 'users'),
            where("displayName", "==", userName))
        try {
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
              setUser(doc.data());
            });

        } catch (err) {
            setErr(true)
        }


    }
    const handleKey = e => {
        e.code === "Enter" && handleSearch()
    }
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="find dniwe" onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} />

            </div>
            { err && <span>User not found</span>}
            {user && <div className="userChat">
                <img src={user.photoURL} alt="" />

                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}


        </div>
    )
}
export default Search