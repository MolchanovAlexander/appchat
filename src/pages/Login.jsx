import React, { useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate , Link} from "react-router-dom";
import { auth } from "../firebase";

const Login = (props) => {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {

        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
                await signInWithEmailAndPassword(auth, email, password)
                navigate('/')

        } catch (error) {
            setError(true)
            // ..
        };
    }

    return <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">BugChat</span>
            <span className="title">Login</span>
            <form onSubmit={ handleSubmit }>

                <input type="email" placeholder="email" />
                <input type="password" placeholder="password" />

                <button>Sign In</button>
                {error && <span style={{ color: "red" }}>{error}Something wrong</span>}
            </form>
            <p>You don't have an account?<Link to="/register">Register</Link></p>
        </div>

    </div>
}

export default Login