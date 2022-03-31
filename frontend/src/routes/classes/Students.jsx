import "./StudentOverview.css";
import profile from "../../img/Profile.png";
import edit from "../../img/edit.png";
import updateImg from "../../img/save.png";
import request from "../../utils/Request";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Students() {
  const { tripID, studentID } = useParams();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(true);

  const [student, setStudent] = useState();

  // Component did mount
  useEffect(() => {
    // Get the student data
    getStudentData();
  }, []);

  function update(key, value, parent = null) {
    let temp = { ...student };
    if (parent) temp[parent][key] = value;
    else temp[key] = value;
    setStudent(temp);
  }

  async function getStudentData() {
    let data = await request(
      "POST",
      "trip/student/get",
      { studentID: studentID, tripID: tripID },
      true
    );

    if (!data.success) {
      alert("Error getting student information.");
      return;
    }

    setStudent(data.body);
  }

  console.log(student);

  async function updateStudent() {
    let data = await request(
      "POST",
      "trip/student/update",
      { studentID: studentID, tripID: tripID, data: student },
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
    if (!isDisabled2) updateStudent();
    setIsDisabled2(!isDisabled2);
  };

  if (!student) {
    return null;
  }

  return (
    <>
      <div className="main-div">
        <div className="grid-container">
          <div className="grid-item grid-item-1 one">
            <Link to={-1}>Back to Class #1</Link>
          </div>
        </div>
        <div className="">
          <div className="flbox">
            <img className="img-1" src={profile} height={34} />
            <h2>{student.name}</h2>
          </div>
          <div className="grid-container-2">
            <div className="flbox">
              <p className="heading-2">Student Information</p>
            </div>
            {isDisabled == true && (
              <div className="flbox-1">
                <button type="button" onClick={handleClick}>
                  <p className="heading-3">Update</p>
                  <img className="img-2" src={edit} height={23} />
                </button>
              </div>
            )}
            {isDisabled == false && (
              <div className="flbox-1">
                <button type="button" onClick={handleClick}>
                  <p className="heading-3">Save</p>
                  <img className="img-2" src={updateImg} height={23} />
                </button>
              </div>
            )}
          </div>

          <div className="medical-container">
            <div className="medical">
              <div className="flbox-2">
                <h4 className="med-header">Email:</h4>
                <form>
                  <input
                    type="text"
                    value={student.email}
                    disabled={isDisabled}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </form>
              </div>
              <div className="flbox-2">
                <h4 className="med-header">Date of Birth:</h4>
                <form>
                  <input
                    type="date"
                    value={student.dob}
                    disabled={isDisabled}
                    onChange={(e) => update("dob", e.target.value)}
                  />
                </form>
              </div>
              <div className="flbox-2">
                <h4 className="med-header">Phone Number:</h4>
                <form>
                  <input
                    type="text"
                    value={student.phone}
                    disabled={isDisabled}
                    onChange={(e) => update("phone", e.target.value)}
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
                    value={student.gender}
                    onChange={(e) => update("gender", e.target.value)}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </form>
              </div>
            </div>
            <div className="form-control">
              <h4 className="med-header">Medical Information:</h4>
              <textarea
                rows={4}
                disabled={isDisabled}
                value={student.medical}
                style={{ resize: "vertical" }}
                onChange={(e) => update("medical", e.target.value)}
              />
            </div>
          </div>
          <div className="grid-container-2">
            <div className="flbox">
              <p className="heading-2">Emergency Contact Information</p>
            </div>
            {isDisabled2 == true && (
              <div className="flbox-1">
                <button type="button" onClick={handleClick2}>
                  <p className="heading-3">Update</p>
                  <img className="img-2" src={edit} height={23} />
                </button>
              </div>
            )}
            {isDisabled2 == false && (
              <div className="flbox-1">
                <button type="button" onClick={handleClick2}>
                  <p className="heading-3">Save</p>
                  <img className="img-2" src={updateImg} height={23} />
                </button>
              </div>
            )}
          </div>

          <div className="medical-container">
            <div className="medical">
              <div className="flbox-2">
                <h4 className="med-header">Name:</h4>
                <form>
                  <input
                    type="text"
                    value={student.contact.name}
                    disabled={isDisabled2}
                    onChange={(e) => update("name", e.target.value, "contact")}
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
                    value={student.contact.phone}
                    disabled={isDisabled2}
                    onChange={(e) => update("phone", e.target.value, "contact")}
                  />
                </form>
              </div>
              <div className="flbox-2">
                <h4 className="med-header">Relationship:</h4>
                <form>
                  <input
                    type="text"
                    value={student.contact.relationship}
                    disabled={isDisabled2}
                    onChange={(e) =>
                      update("relationship", e.target.value, "contact")
                    }
                  />
                </form>
              </div>
              <div className="flbox-2">
                <h4 className="med-header">Email:</h4>
                <form>
                  <input
                    type="text"
                    value={student.contact.email}
                    disabled={isDisabled2}
                    onChange={(e) => update("email", e.target.value, "contact")}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;
