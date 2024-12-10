import React, { useState, useEffect } from "react";
import "./SidebarEbook.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SidebarEbook = ({ setComponent }) => {
  const [openGroups, setOpenGroups] = useState(() => {
    const savedGroups = localStorage.getItem("openGroups");
    return savedGroups ? JSON.parse(savedGroups) : {};
  });

  const toggleGroup = (group) => {
    setOpenGroups((prevOpenGroups) => {
      const newGroups = {
        ...prevOpenGroups,
        [group]: !prevOpenGroups[group],
      };
      localStorage.setItem("openGroups", JSON.stringify(newGroups));
      return newGroups;
    });
  };

  return (
    <div className="sidebar-ebook">
      <nav className="sidebar-ebook__nav">
        <div className="sidebar-ebook__group">
          <h3
            className={`sidebar-ebook__group-title ${
              openGroups["Typing"] ? "open" : ""
            }`}
            onClick={() => toggleGroup("Typing")}
          >
            Typing {openGroups["Typing"] ? <FaChevronUp /> : <FaChevronDown />}
          </h3>
          {openGroups["Typing"] && (
            <div className="sidebar-ebook__subitems">
              <button
                className="sidebar-ebook__link"
                onClick={() => setComponent("AddTypingParagraph")}
              >
                Add Typing{" "}
              </button>
              <button
                className="sidebar-ebook__link"
                onClick={() => setComponent("EditTypingParagraph")}
              >
                Edit Typing
              </button>
              <button
                className="sidebar-ebook__link"
                onClick={() => setComponent("ManageStatusTypingParagraph")}
              >
               Edit Typing Status
              </button>
              <button
                className="sidebar-ebook__link"
                onClick={() => setComponent("ExamForm")}
              >
                Add exam image
              </button>
              <button
                className="sidebar-ebook__link"
                onClick={() => setComponent("ExamTable")}
              >
                Edit exam image
              </button>
              <button
                className="sidebar-ebook__link"
                onClick={() => setComponent("AddPlanForm")}
              >
                Add price plans
              </button>
            </div>
          )}
        </div>
        
      </nav>
    </div>
  );
};

export default SidebarEbook;
