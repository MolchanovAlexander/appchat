import React from "react";

const Navbar =()=> {
    return (
        <div className="navbar">
            <span className="logo">GufRIP</span>
            <div className="user">
                <img src="https://hips.hearstapps.com/hmg-prod/images/devs-review-1583274230.jpg?crop=0.495xw:0.990xh;0.505xw,0&resize=1200:*"
                 alt="" />
                <span>Gufa</span>
                <button>Logout</button>
            </div>
        </div>
    )
}
export default Navbar