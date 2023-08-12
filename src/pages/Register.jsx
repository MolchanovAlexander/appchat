import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const defaultPhotoUrl = "https://firebasestorage.googleapis.com/v0/b/minichat-85485.appspot.com/o/images.jpeg?alt=media&token=62d28a35-fe3f-47a2-ac71-8d29a1b9177a";

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name https://firebasestorage.googleapis.com/v0/b/minichat-85485.appspot.com/o/images.jpeg?alt=media&token=62d28a35-fe3f-47a2-ac71-8d29a1b9177a
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      if (file) {
        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
      } else {
        try {
          //Update profile
          await updateProfile(res.user, {
            displayName,
            photoURL: defaultPhotoUrl,
          });
          //create user on firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: defaultPhotoUrl,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
          navigate("/");
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
      }

    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
// import React, { useState } from "react";
// import Add from "../img/c"
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../firebase.js"
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//     const [error, setError] = useState(false)
//     const navigate = useNavigate()

//     const handleSubmit = async (e) => {

//         e.preventDefault();
//         const displayName = e.target[0].value;
//         const email = e.target[1].value;
//         const password = e.target[2].value;
//         const file = e.target[3].files[0];

//         try {
//             const res = await createUserWithEmailAndPassword(auth, email, password)

//             const storageRef = ref(storage, displayName);

//             const uploadTask = await uploadBytesResumable(storageRef, file)
//             console.log(res.user.displayName, "<>", res.user.uid);
//             console.log(uploadTask);
//             uploadTask.on(
//                 (error) => {
//                     setError(true)
//                 },
//                 () => {
//                     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//                         await updateProfile(res.user, {
//                             displayName,
//                             photoURL: downloadURL,

//                         });
//                         await setDoc(doc(db, "users", res.user.uid), {
//                             uid: res.user.uid,
//                             displayName,
//                             email,
//                             photoURL: downloadURL
//                         });
//                         await setDoc(doc(db, "usersChats", res.user.uid), {});
//                         navigate('/')
//                     });

//                 }
//             )

//         } catch (error) {
//             setError(true)
//             console.log(error);
//             // ..
//         };
//     }
//     return <div className="formContainer">
//         <div className="formWrapper">
//             <span className="logo">GufRIP Chat</span>
//             <span className="title">Register</span>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="display name" />
//                 <input type="email" placeholder="email" />
//                 <input type="password" placeholder="password" />
//                 <input style={{ display: 'none' }} type="file" id="file" />
//                 <label htmlFor="file"><img src={Add} alt="" />
//                     <span>Add your avatar</span>
//                 </label>
//                 <button>Sign Up</button>
//                 {error && <span style={{ color: "red" }}>{error}</span>}
//             </form>
//             <p>Do you have an account? <Link to="/login">Login</Link></p>
//         </div>

//     </div>
// }

// export default Register