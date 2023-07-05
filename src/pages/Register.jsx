import React from "react";
import Add from "../img/pngwing.com.png"

const Register =(props)=>{
    return <div className="formContainer"> 
        <div className="formWrapper">
            <span className="logo">GufRIP Chat</span>
             <span className="title">Register</span>
            <form>
                <input type ="text" placeholder="display name"/>
                <input type ="email" placeholder="email"/>
                <input type ="password" placeholder="password"/>
                <input style={{display:'none'}}type ="file" id="file"/>
                <label htmlFor="file"><img src={Add} alt="" />
                <span>Add your avatar</span>
                </label>
                <button>Sign Up</button>
            </form>
            <p>Do you have an account? Login</p>
        </div>
        
    </div>
}

export default Register