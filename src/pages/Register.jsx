import React, { useState } from "react";
import Add from "../img/pngwing.com.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, querySnapshot, storage } from "../firebase.js"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";

const Register = () => {
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {

        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(storage);
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                (error) => {
                    setError(true)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,

                        })
                        // console.log(1);
                        // const querySnapshot = await getDocs(collection(db, "/users"));
                        // querySnapshot.forEach((doc) => {
                        //     console.log(`${doc.id} => ${doc.data().displayName}`);
                        // });
                        
                        await setDoc(doc(db, 'users', res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })
                        await setDoc(doc(db, 'usersChat', res.user.uid), {})
                    });

                }
            );

        } catch (error) {
            setError(true)
            // ..
        };
    }
    return <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">GufRIP Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="display name" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />
                <input style={{ display: 'none' }} type="file" id="file" />
                <label htmlFor="file"><img src={Add} alt="" />
                    <span>Add your avatar</span>
                </label>
                <button>Sign Up</button>
                {error && <span style={{ color: "red" }}>Something wrong</span>}
            </form>
            <p>Do you have an account? Login</p>
        </div>

    </div>
}

export default Register