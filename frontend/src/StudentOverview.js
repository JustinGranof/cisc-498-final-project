import './StudentOverview.css';
import profile from './Profile.png';
import edit from './edit.png';


function StudentOverview() {
  return (
    <div className="main-div">
    <div className="grid-container">
      <div className="grid-item grid-item-1 one"><a href="#">Back to Class #1</a></div>
      <div className="grid-item grid-item-2 two"><a href="#">Logout</a></div>
      </div>
      <div className="">
        <div className="flbox">
        <img className="img-1" src={profile} height={34} />
        <h2>Granofsky, Justin</h2>
        </div>
        <div className="grid-container-2">
          <div className="flbox"><p className="heading-2">Medical Information</p></div>
          <div className="flbox-1">
          <p className="heading-3">
            Update
            </p>
          <img className="img-2" src={edit} height={23} />
          </div>
          </div>

          <div className="medical">
          <div className="flbox-2">
            <h4 className="med-header">Full Name:</h4>
            <p className="heading-3">Justin Evan Granofsky</p>
          </div>
          <div className="flbox-2">
          <h4 className="med-header">Date of Birth:</h4>
          <p className="heading-3">January 19, 2000</p>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Height:</h4>
            <p className="heading-3">5'9/5'10</p>
          </div>
          <div className="flbox-2">
          <h4 className="med-header">Gender:</h4>
          <p className="heading-3">Male</p>
          </div>
          </div>
          <div className="grid-container-2">
          <div className="flbox"><p className="heading-2">Contact Information</p></div>
          <div className="flbox-1">
          <p className="heading-3">
            Update
            </p>
          <img className="img-2" src={edit} height={23} />
          </div>
          </div>

          <div className="medical">
          <div className="flbox-2">
            <h4 className="med-header">Email:</h4>
            <p className="heading-3">justin.granofsky@gmail.com</p>
          </div>
          <div className="flbox-2">
          <h4 className="med-header">Phone Number:</h4>
          <p className="heading-3">289-400-5070</p>
          </div>
          <div className="flbox-2">
            <h4 className="med-header">Address:</h4>
            <p className="heading-3">3897 Lodi Rd.</p>
          </div>
          <div className="flbox-2">
          <h4 className="med-header">Emergency Contact:</h4>
          <p className="heading-3">Mom</p>
          </div>
          </div>  
          
        </div>
        
        

    </div>
  );
}

export default StudentOverview;
