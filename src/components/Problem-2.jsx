import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalA from "./ModalA";
import ModalB from "./ModalB";

const Problem2 = () => {
  const navigate = useNavigate();
  const [modalAVisible, setModalAVisible] = useState(false);
  const [modalBVisible, setModalBVisible] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState([]);

  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    fetchContacts(currentPage, modalBVisible ? "United States" : "");
  }, [currentPage]);

  useEffect(() => {
    if (onlyEven === true) {
      const evenContacts = contacts.filter((contact) => contact.id % 2 === 0);
      setContacts(evenContacts);
    } else {
      fetchContacts(currentPage, modalBVisible ? "United States" : "");
    }
  }, [onlyEven]);

  const openModalA = () => {
    setModalAVisible(true);
    setModalBVisible(false);
    navigate("/problem-2/all-contacts");
  };

  const openModalB = () => {
    setModalAVisible(false);
    setModalBVisible(true);
    navigate("/problem-2/us-contacts");
  };

  const closeModal = () => {
    setModalAVisible(false);
    setModalBVisible(false);
    navigate("/problem-2");
  };

  const handleCheckboxChange = () => {
    setOnlyEven((prevValue) => !prevValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    setContacts([]);
    fetchContacts(1, modalBVisible);
  };

  const fetchContacts = async (page, isUS) => {
    try {
      const countryParam = isUS ? "United States" : "";
      const response = await fetch(
        `https://contact.mediusware.com/api/${
          countryParam ? `country-contacts/${countryParam}` : "contacts/"
        }?page=${page}`
      );

      const data = await response.json();
      setContacts(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg"
            type="button"
            onClick={openModalA}
            style={{ color: "#46139f" }}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => openModalB()}
            style={{ color: "#ff7f50" }}
          >
            US Contacts
          </button>
        </div>
      </div>
      {/* Modal A */}
      {modalAVisible && (
        <ModalA
          closeModal={closeModal}
          contacts={contacts}
          onlyEven={onlyEven}
          handleCheckboxChange={handleCheckboxChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}
      {modalBVisible && (
        <ModalB
          closeModal={closeModal}
          contacts={contacts}
          onlyEven={onlyEven}
          handleCheckboxChange={handleCheckboxChange}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}
    </div>
  );
};

export default Problem2;
