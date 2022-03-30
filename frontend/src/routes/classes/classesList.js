import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./classesList.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Modal from "../../utils/Modal";
import request from "../../utils/Request";
import { RiDeleteBinFill } from "react-icons/ri";

export default function ClassList() {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    /* get classes data */
    const [classes, setClasses] = useState([
        { name: 'GEOL 101', numStudents: 26 },
        { name: 'GEOL 237', numStudents: 24 },
        { name: 'GEOL 102', numStudents: 30 }
    ]);

    const toClass=(className)=>{
        navigate('/class',{state:{name:className}});
          }

    async function createClass() {
        if (!name) return;
        let data = await request(
            "POST",
            "class/create",
            { name: name },
            true
        );
        if (data && data.success) {

            setOpen(false);
        } else {
            setError(data.body);
        }
    }

    async function deleteClass(name) {
        let data = await request(
            "POST",
            "class/delete",
            { name: name },
            true
        );
        // if (data) {
        //   //get Data
        // }
    }

    // Display classes
    return (
        <>
            <Modal show={open} setShow={setOpen}>
                <h2>Create a new class</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createClass();
                    }}
                >
                    <label>What would you like to name this class?</label>
                    <br />
                    <input
                        className="create-admin-input"
                        value={name}
                        placeholder="Ex. GEOL 101"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    {error && (
                        <p style={{ marginTop: "25px", color: "red" }}>Error: {error}</p>
                    )}
                    <div>
                        <button
                            type={"submit"}
                            style={{ backgroundColor: "#00305E" }}
                            className="create-admin-btn"
                        >
                            Create
                        </button>
                        <button
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="create-admin-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>

            <div className="classes-container">
                <p className="logout">
                    <Link to="/logout">Logout</Link>
                </p>
                <div className="header-container">
                    <h1>Classes</h1>
                    <button className="create-btn"
                        onClick={() => {
                            setOpen(true);
                            setError("");
                            setName("");
                        }}>
                        <div className="create-btn-container">
                            <AiOutlinePlusCircle style={{ margin: 5 }}></AiOutlinePlusCircle>
                            <p>Create new</p>
                        </div>
                    </button>
                </div>

                {classes.map((item, index) => (
                        <button className="class-btn">
                            <div className="delete-btn-container">
                                <button className="delete-btn">
                                    <RiDeleteBinFill className="delete-btn"
                                        onClick={(e) => {
                                            if (
                                                window.confirm(
                                                    "Are you sure you want to delete " +
                                                    item.name +
                                                    "?"
                                                )
                                            )
                                                deleteClass(item.name);
                                        }}></RiDeleteBinFill>
                                </button>
                            </div>

                            <div onClick={()=>{toClass(item.name)}} className="link" >
                                <p className="name">{item.name}</p>
                                <p className="size">{item.numStudents} students</p>
                            </div>

                            {/* <Link to={{ pathname: "/class", state: {name: item.name}}} className="link" >
                                <p className="name">{item.name}</p>
                                <p className="size">{item.numStudents} students</p>
                            </Link> */}
                        </button>
                ))}
            </div>
        </>
    );
}