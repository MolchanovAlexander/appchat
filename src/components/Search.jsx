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
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { json } from "react-router-dom";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
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
      const res = await getDoc(doc(db, "chats", combinedId));

      if (res.exists()) {

        //delete a chat in chats collection
        await deleteDoc(doc(db, "chats", combinedId)).then(console.log("del"));

      }
    } catch (err) {
      console.log(json(err));
    }

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={handleSearch}>{">"}</button>
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <button className="userChatInfoDelete" onClick={handleDelete}>del</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
// import React, { useContext, useState } from "react";
// import {
//     query,
//     where,
//     collection,
//     getDoc,
//     setDoc,
//     doc,
//     updateDoc,
//     serverTimestamp,
//     getDocs
// } from "firebase/firestore";
// import { db } from "../firebase";
// import { AuthContext } from "../context/AuthContext";

// const Search = () => {

//     const [userName, setUserName] = useState("")
//     const [user, setUser] = useState(null)
//     const [err, setErr] = useState(false)

//     const { currentUser } = useContext(AuthContext)

//     const handleSearch = async () => {
//         const q = query(
//             collection(db, 'users'),
//             where("displayName", "==", userName))

//         try {
//             const querySnapshot = await getDocs(q);

//             querySnapshot.forEach((doc) => {
//                 setUser(doc.data());
//             });

//         } catch (err) {
//             setErr(true)
//         }


//     }
//     const handleSelect = async () => {
//         // chek whether the group ( chats in firestore ) exists, if not - create
//         const combineId = currentUser.uid > user.uid
//             ? currentUser.uid + user.uid
//             : user.uid + currentUser.uid;
//         try {
//             const res = await getDoc(doc(db, "chats", combineId))

//             if (!res.exists()) {
//                 // create a chat in chats collection
//                 await setDoc(doc(db, "chats", combineId), { messages: [] })

//                 // create user chats
//                 await updateDoc(doc(db, "usersChats", currentUser.uid), {
//                     [combineId + ".userInfo"]: {
//                         uid: user.uid,
//                         displayName: user.displayName,
//                         photoURL: user.photoURL
//                     },
//                     [combineId + ".date"]: serverTimestamp()
//                 })
//                 await updateDoc(doc(db, "usersChats", user.uid), {
//                     [combineId + ".userInfo"]: {
//                         uid: currentUser.uid,
//                         displayName: currentUser.displayName,
//                         photoURL: currentUser.photoURL
//                     },
//                     [combineId + ".date"]: serverTimestamp()
//                 })

//             }
//         } catch (err) {
//             setUser(null)
//             setUserName("")
//         }

//         // create userChats
//     }
//     const handleKey = e => {
//         e.code === "Enter" && handleSearch()
//     }
//     return (
//         <div className="search">
//             <div className="searchForm">
//                 <input
//                     type="text"
//                     placeholder="find dniwe"
//                     onKeyDown={handleKey}
//                     onChange={e => setUserName(e.target.value)}
//                     value={userName || ""}
//                 />

//             </div>
//             {err && <span>User not found</span>}
//             {user && <div className="userChat" onClick={handleSelect}>
//                 <img src={user.photoURL} alt="" />

//                 <div className="userChatInfo">
//                     <span>{user.displayName}</span>
//                 </div>
//             </div>}

//         </div>
//     )
// }
// export default Search