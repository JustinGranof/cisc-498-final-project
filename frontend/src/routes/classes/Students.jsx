import "./StudentOverview.css";
import profile from "./Profile.png";
import edit from "./edit.png";
import request from "../../utils/Request";

import { useState, useEffect } from "react";

function Students() {
  var tripId = "623cac53c071a74d9056f69a";
  var studentId = "62431c7b1892d0b2480fcc6c";

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("January 19, 2000");
  const [height, setHeight] = useState("5'9");
  const [gender, setGender] = useState("Male");

  const [email, setEmail] = useState("Justin.granofsky@gmail.com");
  const [number, setNumber] = useState("289-400-5070");
  const [emergencyNumber, setEmergencyNumber] = useState("905-450-5070");
  const [address, setAddress] = useState("3897 Lodi Rd.");
  const [emergency, setEmergency] = useState("Mom");

  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);

  // Component did mount
  useEffect(() => {
    // Get the student data
    getStudentData();
  }, []);

  async function getStudentData() {
    let data = await request(
      "POST",
      "trip/student/get",
      { studentID: studentId, tripID: tripId },
      true
    );
    console.log(data);

    if (!data.success) {
      alert("Error getting student information.");
      return;
    }

    setName(data.body.name);
  }

  async function updateStudent() {
    let data = await request(
      "POST",
      "trip/student/update",
      { studentID: studentId, tripID: tripId, data: { name: name } },
      true
    );

    if (!data.success) {
      alert("Error updating student.");
      return;
    }
  }

  const handleClick = () => {
    //If not disabled we update it
    if (!isDisabled) {
      updateStudent();
    }

    setIsDisabled(!isDisabled);
  };

  const handleClick2 = () => {
    setIsDisabled2(!isDisabled2);
  };

  return (
    <div className="main-div">
      <div className="grid-container">
        <div className="grid-item grid-item-1 one">
          <a href="#">Back to Class #1</a>
        </div>
        <div className="grid-item grid-item-2 two">
          <a href="#">Logout</a>
        </div>
      </div>
      <div className="">
        <div className="flbox">
          <img className="img-1" src={profile} height={34} />
          <h2>Granofsky, Justin</h2>
        </div>
        <div className="grid-container-2">
          <div className="flbox">
            <p className="heading-2">Medical Information</p>
          </div>
          <div className="flbox-1">
            <button type="button" onClick={handleClick}>
              <p className="heading-3">Update</p>
              <img className="img-2" src={edit} height={23} />
            </button>
          </div>
        </div>

        <div className="medical">
          <div className="flbox-2">
            <h4 className="med-header">Full Name:</h4>
            <form>
              <input
                type="text"
                value={name}
                disabled={isDisabled}
                onChange={(e) => setName(e.target.value)}
              />
            </form>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Date of Birth:</h4>
            <form>
              <input
                type="text"
                value={birth}
                disabled={isDisabled}
                onChange={(e) => setBirth(e.target.value)}
              />
            </form>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Height:</h4>
            <form>
              <input
                type="text"
                value={height}
                disabled={isDisabled}
                onChange={(e) => setHeight(e.target.value)}
              />
            </form>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Gender:</h4>
            <form>
              <select
                id="gender"
                name="gender"
                disabled={isDisabled}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </form>
          </div>
        </div>
        <div className="grid-container-2">
          <div className="flbox">
            <p className="heading-2">Contact Information</p>
          </div>
          <div className="flbox-1">
            <button type="button" onClick={handleClick2}>
              <p className="heading-3">Update</p>
              <img className="img-2" src={edit} height={23} />
            </button>
          </div>
        </div>

        <div className="medical">
          <div className="flbox-2">
            <h4 className="med-header">Email:</h4>
            <form>
              <input
                type="text"
                value={email}
                disabled={isDisabled2}
                onChange={(e) => setEmail(e.target.value)}
              />
            </form>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Phone Number:</h4>
            <form>
              <input
                type="tel"
                maxLength="12"
                pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                value={number}
                disabled={isDisabled2}
                onChange={(e) => setNumber(e.target.value)}
              />
            </form>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Address:</h4>
            <form>
              <input
                type="text"
                value={address}
                disabled={isDisabled2}
                onChange={(e) => setAddress(e.target.value)}
              />
            </form>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Emergency Contact Name:</h4>
            <form>
              <input
                type="text"
                value={emergency}
                disabled={isDisabled2}
                onChange={(e) => setEmergency(e.target.value)}
              />
            </form>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Emergency Number:</h4>
            <form>
              <input
                type="tel"
                maxLength="12"
                pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                value={emergencyNumber}
                disabled={isDisabled2}
                onChange={(e) => setEmergencyNumber(e.target.value)}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
