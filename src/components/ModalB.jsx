import React, { useState } from "react";
import ModalC from "./ModalC";

const ModalB = ({
  closeModal,
  contacts,
  onlyEven,
  handleCheckboxChange,
  handleSearchSubmit,
}) => {
  const [detailsModal, setDetailsModal] = useState(false);
  return (
    <div style={{ color: "#ff7f50" }}>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal B</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              {/* Contacts List for Modal A */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Country</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts
                    .filter(
                      (contact) => contact.country.name === "United States"
                    )
                    .map((contact, index) => (
                      <tr key={index} onClick={() => setDetailsModal(true)}>
                        <th scope="row">{contact.id}</th>
                        <td>{contact.phone}</td>
                        <td>{contact.country.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="onlyEvenCheckbox"
                  checked={onlyEven}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                  Only even
                </label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSearchSubmit}
              >
                Search
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {detailsModal && <ModalC />}
    </div>
  );
};

export default ModalB;
