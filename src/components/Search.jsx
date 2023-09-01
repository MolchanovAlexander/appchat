import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  deleteDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { json } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { dispatch } = useContext(ChatContext)
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"), where("displayName", "==", username)
      //where("all", "!=",0)

    );


    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());

      });
    } catch (err) {
      setErr(true);
    }

  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();

  };



  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }

    setUser(null);
    setUsername("")
  };
  const handleDelete = async () => {
    //check whether the group(chats in firestore) exists
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {

      //delete a chat in chats collection Ugovi4
      await deleteDoc(doc(db, "chats", combinedId))


      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId]: deleteField()
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId]: deleteField()
      });

    } catch (err) {
      console.log(json(err));
    }

    setUser(null);
    setUsername("")
    dispatch({ type: "CLOSE_USER" })

  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={handleSearch}>{">"}</button>
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" >
          <div onClick={handleSelect}>
            <img className="userChatImg" src={user.photoURL} alt="" />
            <div className="userChatInfo"><span>{user.displayName}</span>
            </div>
          </div>
          <div>
            <button className="userChatInfoDelete" onClick={handleDelete}>Delete</button>
          </div>


        </div>
      )}
    </div>
  );
};

export default Search;
