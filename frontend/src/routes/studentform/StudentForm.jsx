import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Logo from "../../img/queens_logo.png";

import "./classform.css";

export default function StudentForm(props) {
  const { tripID } = useParams();

  const DATA_FIELDS = {
    name: "",
    dob: "",
    gender: "Male",
    contact: {
      name: "",
      email: "",
      relationship: "",
    },
  };

  const [data, setData] = useState(DATA_FIELDS);

  function updateData(key, value, parent = null) {
    let temp = { ...data };
    if (parent) temp[parent][key] = value;
    else temp[key] = value;
    setData(temp);
  }

  function submit() {}

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
            <div className="form-control">
              <label for="medinfo">Medical Information</label>
              <textarea id="medinfo" rows="5" cols="50">
                Enter any medical info
              </textarea>
            </div>
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
      <label htmlFor={props.dataKey}>
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
