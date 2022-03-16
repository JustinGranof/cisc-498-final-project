import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./classList.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
    
export default function ClassList() {

    const [classes, setClasses] = useState([]);
    
    //getClasses();
    
    // Display classes
    return (
        <div className="classes-container">
            <p className="logout">
            <Link to="/logout">Logout</Link>
            </p>
            <div className="header-container">
                <h1>Classes</h1>
                <button className="create-btn">
                    <div className="create-btn-container">
                        <AiOutlinePlusCircle style={{margin:5}}></AiOutlinePlusCircle>
                    <p>Create new</p>
                    </div>
                </button>
            </div>
            <Link to="/class">
                <button className="class-btn">
                    <p className="name">Class #1</p>
                    <p className="size">26 students</p>
                </button>
            </Link>
            <Link to="/class">
                <button className="class-btn">
                    <p className="name">Class #2</p>
                    <p className="size">26 students</p>
                </button>
            </Link>
            <Link to="/class">
                <button className="class-btn">
                    <p className="name">Class #3</p>
                    <p className="size">26 students</p>
                </button>
            </Link>
        </div>
    );
   }