import React, { useEffect, useState } from "react";
import request from "../../utils/Request";

import Create from "../../img/create.svg";
import Delete from "../../img/delete.svg";

import "./admins.css";
import Modal from "../../utils/Modal";

export default function Admins(props) {
  const [admins, setAdmins] = useState(undefined);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  // Component did mount
  useEffect(() => {
    // Get the admins
    getAdmins();
  }, []);

  async function getAdmins() {
    let data = await request("GET", "account/get", {}, true);

    if (!data) {
      return;
    }

    setAdmins(data);
  }

  async function setStatus(email, status) {
    let data = await request(
      "POST",
      "account/updateStatus",
      { email: email, status: status },
      true
    );
    if (data) {
      getAdmins();
    }
  }

  async function deleteAdmin(email) {
    let data = await request("POST", "account/delete", { email: email }, true);
    if (data) {
      getAdmins();
    }
  }

  return (
    <>
      <Modal show={open} setShow={setOpen}>
        <h2>Create a new Admin</h2>
        <label>What email should this account use?</label>
        <br />
        <input />
        <br />
        <label>Enter a password for the account.</label>
        <br />
      </Modal>
      <div className="classes-container">
        <div className="admins-header">
          <h2>Admin Accounts</h2>
          <div onClick={() => setOpen(true)} className="create-new">
            <img height={20} src={Create} />
            Create New
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
            placeholder="Enter an admin's email..."
            className="search-input"
          />
        </div>
        <div className="admins-table-container">
          <table className="admins-table">
            <thead>
              <tr>
                <td>Email</td>
                <td>Created</td>
                <td>Change Status</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {admins &&
                admins.map((admin, index) => {
                  if (!admin.email.includes(search)) return;
                  return (
                    <tr key={index}>
                      <td>{admin.email}</td>
                      <td>{new Date(admin.created).toDateString()}</td>
                      <td>
                        {admin.enabled ? (
                          <button
                            onClick={() => setStatus(admin.email, false)}
                            className="disable-btn status-btn"
                          >
                            Disable
                          </button>
                        ) : (
                          <button
                            onClick={() => setStatus(admin.email, true)}
                            className="enable-btn status-btn"
                          >
                            Enable
                          </button>
                        )}
                      </td>
                      <td>
                        <img
                          onClick={() => deleteAdmin(admin.email)}
                          className="delete-user"
                          height={22}
                          src={Delete}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {!admins && <p style={{ textAlign: "center" }}>Loading...</p>}
      </div>
    </>
  );
}
