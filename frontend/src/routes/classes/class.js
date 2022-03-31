import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./class.css";
import { RiDeleteBinFill } from "react-icons/ri";
import Switch from "react-input-switch";
import request from "../../utils/Request";

export default function Class() {
  const { tripID } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [value, setValue] = useState("yes");
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState(undefined);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    let data = await request(
      "POST",
      "trip/students/get",
      { tripID: tripID },
      true
    );

    if (!data.success) {
      console.log("HERE");
      setStudents(false);
    } else {
      if (data.body) {
        setStudents(data.body);
      } else {
        setStudents(false);
      }
    }
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

  async function deleteStudent(id) {
    let data = await request(
      "POST",
      "trip/student/delete",
      { id: id },
      true
    );

    if (!data.success) {
        alert("Error deleting student.");
        return;
    }
  }

  async function getJoinLink() {
    let path = document.location.href;
    let finder = path.substring(path.indexOf("//") + 2);
    let missed = path.substring(0, path.indexOf("//") + 2);
    finder = finder.indexOf("/") + missed.length;
    let url = path.substring(0, finder);
    navigator.clipboard.writeText(url + "/form/" + tripID);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 7500);
    return;
  }

  function studentList() {
    if (students == undefined) {
      return "loading...";
    } else if (students == false) {
      return "No students in this class yet";
    }

    return students.map((student, index) => {
      const { _id, name, email, phone } = student;

      if (!name.includes(search.toLowerCase())) return;
      return (
        <tr className="class-student-row" key={_id}>
          <td
            onClick={() => {
              navigate("/classes/" + tripID + "/" + _id);
            }}
          >
            {name}
          </td>
          <td
            onClick={() => {
              navigate("/classes/" + tripID + "/" + _id);
            }}
          >
            {email}
          </td>
          <td
            onClick={() => {
              navigate("/classes/" + tripID + "/" + _id);
            }}
          >
            {phone}
          </td>
          <td>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete " + name + "?"
                  )
                )
                  deleteStudent(_id);
              }}
              className="delete-btn"
            >
              <RiDeleteBinFill></RiDeleteBinFill>
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="classes-container">
      <div className="nav">
        <p className="logout">
          <Link to="/classes">Back to classes</Link>
        </p>
      </div>

      <h1>{location.state.name}</h1>

      <div className="header-bar">
        <button
          onClick={() => {
            getJoinLink();
          }}
          className="join-btn"
        >
          Get Student Join Link
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 10 }}>Allow new students to join</p>
          <Switch
            styles={{
              track: {
                backgroundColor: "gray",
              },
              trackChecked: {
                backgroundColor: "#20E00F",
              },
              button: {
                backgroundColor: "#F2F2F2",
              },
              buttonChecked: {
                backgroundColor: "#F2F2F2",
              },
            }}
            on="yes"
            off="no"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      {copied && <p>Copied to clipboard!</p>}
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
