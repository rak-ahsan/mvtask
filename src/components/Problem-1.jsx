import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");

  //   State for Storing all user info
  const [allData, setAllData] = useState([{}]);

  //State for store All InputValue
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const handleClick = (val) => {
    setShow(val);
  };

  //  Function for Submit
  const handleFromSubmit = (e) => {
    e.preventDefault();
    const newData = { name, status };
    setAllData((prevData) => [...prevData, newData]);
    setName("");
    setStatus("");
  };

  //Function for Filter Data Based on Navigation
  const filteredData = () => {
    if (show === "all") {
      const activeTasks = allData.filter((data) => data.status === "Active");
      const completedTasks = allData.filter(
        (data) => data.status === "Completed"
      );
      const pendingTasks = allData.filter((data) => data.status === "Pending");
      const archiveTasks = allData.filter((data) => data.status === "Archive");
      return [
        ...activeTasks,
        ...completedTasks,
        ...pendingTasks,
        ...archiveTasks,
      ];
    } else if (show === "active") {
      return allData.filter((data) => data.status === "Active");
    } else if (show === "completed") {
      return allData.filter((data) => data.status === "Completed");
    } else if (show === "pending") {
      return allData.filter((data) => data.status === "Pending");
    } else if (show === "archive") {
      return allData.filter((data) => data.status === "Archive");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          {/* Add on Sumbmit event for handle from submit */}
          <form
            onSubmit={(e) => handleFromSubmit(e)}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                value={name}
                className="form-control"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "pending" && "active"}`}
                type="button"
                onClick={() => handleClick("pending")}
              >
                Pending
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "archive" && "active"}`}
                type="button"
                onClick={() => handleClick("archive")}
              >
                Archive
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Add Map Function for render user list baed on the navigation */}
              {filteredData().map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
