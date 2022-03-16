import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./class.css";
import { RiDeleteBinFill } from "react-icons/ri";
import Switch from 'react-input-switch';
    
export default function Class() {

    const [query, setQuery] = useState("")
    const [value, setValue] = useState('yes');
    
    // example data
    const students = [
        {"id": 1, "firstName":"Kim", "lastName": "Kardashian", "email":"abc@gmail.com", "phone":"613-849-3928"},
        {"id": 2, "firstName":"Pete", "lastName": "Davidson", "email":"abc@gmail.com", "phone":"613-849-3928"},
        {"id:": 3, "firstName":"Kanye", "lastName": "West", "email":"abc@gmail.com", "phone":"613-849-3928"},
        {"id": 4, "firstName":"North", "lastName": "West", "email":"abc@gmail.com", "phone":"613-849-3928"},
        {"id": 5, "firstName":"Miley", "lastName": "Cyrus", "email":"abc@gmail.com", "phone":"613-849-3928"},
        {"id": 6, "firstName":"Asap", "lastName": "Rocky", "email":"abc@gmail.com", "phone":"613-849-3928"},
        {"id": 7, "firstName":"Selena", "lastName": "Gomez", "email":"abc@gmail.com", "phone":"613-849-3928"},
    ]
        
    function studentList() {
        return students.map((student, index) => {
           const { id, firstName, lastName, email, phone } = student 
           return (
              <tr key={id}>
                 <td>{lastName}, {firstName}</td>
                 <td>{email}</td>
                 <td>{phone}</td>
                 <td><button className="delete-btn"><RiDeleteBinFill></RiDeleteBinFill></button></td>
              </tr>
           )
        })
     }
      
    return (
        <div className="classes-container">
            <div className="nav">
                <p className="logout">
                <Link to="/classes">Back to classes</Link>
                </p>
                <p className="logout">
                <Link to="/logout">Logout</Link>
                </p>
            </div>
          
            <h1>Class #1</h1>

            <div className="header-bar">
                <button className="join-btn">Get Student Join Link</button>
                <div style={{display:"flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{margin:10}}>Allow new students to join</p>
                    <Switch styles={{
                        track: {
                        backgroundColor: 'gray'
                        },
                        trackChecked: {
                        backgroundColor: '#20E00F'
                        },
                        button: {
                        backgroundColor: '#F2F2F2'
                        },
                        buttonChecked: {
                        backgroundColor: '#F2F2F2'
                        }
                    }} on="yes" off="no" value={value} onChange={setValue} />
                </div>
            </div>
            <div>
                <p>Search</p>
                <input className="search-bar" placeholder="Enter a student's name"/>
            </div>
            <div className="table-container">
                <table className="student-table" style={{ marginTop: 20 }}>
                <tbody>{studentList()}</tbody>
                </table>
            </div>
                
        </div>
    );
   }