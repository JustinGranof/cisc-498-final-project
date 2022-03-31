import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Logo from "../../img/queens_logo.png";

import "./classform.css";
import request from "../../utils/Request";

export default function StudentForm(props) {
  const { tripID } = useParams();

  const DATA_FIELDS = {
    name: "",
    dob: "",
    email: "",
    phone: "",
    gender: "Male",
    medical: "",
    contact: {
      name: "",
      email: "",
      relationship: "",
      phone: "",
    },
  };

  const [data, setData] = useState(DATA_FIELDS);
  const [error, setError] = useState("");

  function updateData(key, value, parent = null) {
    let temp = { ...data };
    if (parent) temp[parent][key] = value;
    else temp[key] = value;
    setData(temp);
  }

  function verify() {
    let missing = false;
    Object.keys(data).forEach((key) => {
      if (!data[key]) missing = true;
    });

    Object.keys(data["contact"]).forEach((key) => {
      if (!data["contact"][key]) missing = true;
    });

    return !missing;
  }

  function submit() {
    console.log("SUBMIT:", data);
    if (!verify()) {
      // not filled out
      setError("Error: Please fill out all the required fields.");
      return;
    }

    // submit
    request(
      "POST",
      "trip/student/create",
      { tripID: tripID, data: data },
      true
    );
  }

  return (
    <>
      <div className="body">
        <div className="container">
          <div className="header">
            <img src={Logo} alt="logo" />
            <h2>Queen's Rapid Response Form</h2>
            <link rel="stylesheet" type="text/css" href="classform.css" />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            id="form"
            className="form"
          >
            <h3>Contact Info</h3>

            <InputField
              label="Full Name"
              dataKey="name"
              placeholder="Enter your full name..."
              data={data}
              update={updateData}
            />
            <InputField
              label="Email"
              dataKey="email"
              placeholder="Enter your email address..."
              data={data}
              update={updateData}
            />
            <InputField
              label="Phone Number"
              dataKey="phone"
              placeholder="Enter your phone number..."
              data={data}
              update={updateData}
            />
            <div className="split">
              <InputField
                label="Date of Birth"
                dataKey="dob"
                placeholder="Enter your first name..."
                data={data}
                type={"date"}
                update={updateData}
              />
              <InputField
                label="Gender"
                dataKey="gender"
                data={data}
                update={updateData}
                type={"select"}
                options={["Male", "Female", "Other"]}
              />
            </div>
            <hr />
            <h3>Emergency Contact Info</h3>
            <InputField
              label="Full Name"
              dataKey="name"
              parent="contact"
              placeholder="Enter your contact's full name..."
              data={data}
              update={updateData}
            />
            <InputField
              label="Email"
              dataKey="email"
              parent="contact"
              placeholder="Enter your contact's email..."
              data={data}
              type={"email"}
              update={updateData}
            />
            <div className="split">
              <InputField
                label="Relationship"
                dataKey="relationship"
                parent="contact"
                placeholder="How are you related to this contact?"
                data={data}
                update={updateData}
              />
              <InputField
                label="Phone Number"
                dataKey="phone"
                parent="contact"
                placeholder="Enter your contact's phone number..."
                data={data}
                update={updateData}
              />
            </div>
            <hr />
            <h3>Medical Information</h3>
            <InputField
              data={data}
              dataKey="medical"
              label="Allergies, conditions, etc."
              type="textarea"
              update={updateData}
              placeholder="Enter your medical information here..."
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type={"submit"}>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

function InputField(props) {
  props = { ...{ required: true }, ...props };
  return (
    <div className="form-control">
      <label
        className={props.dataKey + "-label"}
        style={{ display: "block" }}
        htmlFor={props.dataKey}
      >
        {props.required && <span style={{ color: "red" }}>* </span>}
        {props.label}
      </label>
      {props.type === "select" ? (
        <select
          value={props.data[props.dataKey]}
          onChange={(e) => props.update(props.dataKey, e.target.value)}
          style={{ padding: 0 }}
        >
          {props.options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </select>
      ) : props.type === "textarea" ? (
        <textarea
          value={props.data[props.dataKey]}
          onChange={(e) => props.update(props.dataKey, e.target.value)}
          rows={5}
          placeholder={props.placeholder}
          id={props.dataKey}
        />
      ) : (
        <input
          type={props.type ? props.type : "text"}
          placeholder={props.placeholder}
          onChange={(e) =>
            props.update(props.dataKey, e.target.value, props.parent)
          }
          value={
            props.parent
              ? props.data[props.parent][props.dataKey]
              : props.data[props.dataKey]
          }
          id={props.dataKey}
        />
      )}
    </div>
  );
}
