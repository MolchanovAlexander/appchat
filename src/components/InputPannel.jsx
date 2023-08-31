import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputPannel = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [progress, setProgress] = useState(0);
  const isLoading = progress > 0;

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  const handleSend = async () => {
    // works if img fille choosen or text more than 1 "space"

    if ((text !== " ") && (text.length > 0 || img !== null)) {
      if (img) {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          'state changed',
          (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            console.log('Upload progress', progress)
          },
          (error) => {
            //TODO:Handle Error
            console.log('Error upload')
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
              setProgress(0)
            } catch (err) {
              console.log(err)
            }
          }
        );
      } else {

        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),

          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
      setProgress(0)
      console.log({ progress });
    }

  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSend();

  };
  return (
    <div className="inputPannel">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKey}
      />

      <div className="send">
        
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button disabled={isLoading || data.chatId === "null"} onClick={handleSend}>{isLoading ? 'Loading' : 'Send'}</button>
      </div>
    </div>
  );
};

export default InputPannel;
