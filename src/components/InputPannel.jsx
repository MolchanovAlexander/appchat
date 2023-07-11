import React from "react";
import File from "../img/file.svg"
import Attach from "../img/even.svg"

const InputPannel =()=> {
    return (
        <div className="inputPannel">
            <input type = "text" placeholder="Type something to them..." />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" id="file" style={{display:"none"}}/>
                <label htmlFor="file">
                    <img src={File} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}
export default InputPannel