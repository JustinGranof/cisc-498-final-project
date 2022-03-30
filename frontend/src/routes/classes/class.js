import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./class.css";
import { RiDeleteBinFill } from "react-icons/ri";
import Switch from 'react-input-switch';
import request from "../../utils/Request";

export default function Class() {

    var tripId = "623cac53c071a74d9056f69a";

    const [query, setQuery] = useState("")
    const [value, setValue] = useState('yes');
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [students, setStudents] = useState(undefined);

    useEffect(() => {
       getStudents();
    }, []);

    async function getStudents() {
        let data = await request("POST", "trip/students/get", {tripID: tripId}, true);
    
        if (!data.success) {
          alert("Error getting class information.");
          return;
        }
        console.log(data.body);
    
        setStudents(data.body);
    }


    // get data for {location.state.name}
    // example data
    // const students = [
    //     { "id": 1, "firstName": "Kim", "lastName": "Kardashian", "email": "abc@gmail.com", "phone": "613-849-3928" },
    //     { "id": 2, "firstName": "Pete", "lastName": "Davidson", "email": "abc@gmail.com", "phone": "613-849-3928" },
    //     { "id:": 3, "firstName": "Kanye", "lastName": "West", "email": "abc@gmail.com", "phone": "613-849-3928" },
    //     { "id": 4, "firstName": "North", "lastName": "West", "email": "abc@gmail.com", "phone": "613-849-3928" },
    //     { "id": 5, "firstName": "Miley", "lastName": "Cyrus", "email": "abc@gmail.com", "phone": "613-849-3928" },
    //     { "id": 6, "firstName": "Asap", "lastName": "Rocky", "email": "abc@gmail.com", "phone": "613-849-3928" },
    //     { "id": 7, "firstName": "Selena", "lastName": "Gomez", "email": "abc@gmail.com", "phone": "613-849-3928" },
    // ]

    async function deleteStudent(email) {
        let data = await request(
            "POST",
            "trip/student/delete",
            { email: email },
            true
        );
        // if (data) {
        //   //get Data
        // }
    }

    async function getJoinLink() {
        return;
    }

    function studentList() {
        if (students == undefined){
            return "loading";
        }
        return students.map((student, index) => {
            const { id, name, email, phone } = student;


            if (!name.includes(search.toLowerCase())) return;
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>
                        <button onClick={() => {
                            if (
                                window.confirm(
                                    "Are you sure you want to delete " +
                                    name +
                                    "?"
                                )
                            ) deleteStudent(email)
                        }}
                            className="delete-btn">
                            <RiDeleteBinFill></RiDeleteBinFill>
                        </button>
                    </td>
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

            <h1>{location.state.name}</h1>

            <div className="header-bar">
                <button onClick={() => { getJoinLink() }} className="join-btn">Get Student Join Link</button>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{ margin: 10 }}>Allow new students to join</p>
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

            <div className="search-container">
                <label htmlFor="search">Search</label>
                <br />
                <input
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                    placeholder="Enter a student's name"
                    className="search-input"
                />
            </div>

            <div className="table-container">
                <table className="student-table" style={{ marginTop: 20 }}>
                    <tbody>{studentList()}</tbody>
                </table>
            </div>

        </div>
    );
}