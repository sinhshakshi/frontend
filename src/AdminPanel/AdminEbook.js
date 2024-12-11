import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import SidebarEbook from "./SidebarEbook";
import AdminHeader from "./AdminHeader";
import "./AdminEbook.css";

import AddTypingParagraph from "../Forms/AddTypingParagraph";
import EditTypingParagraph from "../Forms/EditTypingParagraph";
import ExamForm from "../Forms/Examform";
import ExamTable from "../Forms/ExamTable";
import AddPlanForm from "../Forms/AddPlanForm";
import ManageStatusTypingParagraph from "../Forms/ManageStatusTypingParagraph"
import TypingInfo from "../Forms/TypingInfo";

const AdminTyping = () => {
  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "AddTypingParagraph"
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const [cookies] = useCookies(["myadmin"]);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const tokenAdmin = cookies.myadmin;
        if (!tokenAdmin) {
          throw new Error("No token found");
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkaccessadmin`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenAdmin}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Access denied");
        }

        const result = await response.json();
        if (result.message !== "Access granted") {
          navigate("/login-admin-ebook");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "You do not have permission to access this page.",
        });
        navigate("/login-admin-ebook");
      }
    };

    checkAccess();
  }, [cookies, navigate]);

  useEffect(() => {
    localStorage.setItem("activeComponent", activeComponent);
  }, [activeComponent]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const renderComponent = () => {
    switch (activeComponent) {

      case "AddTypingParagraph":
        return <AddTypingParagraph />;
      case "EditTypingParagraph":
        return <EditTypingParagraph />;
        case "ExamForm":
          return <ExamForm />;
          case "ExamTable":
            return <ExamTable />;
            case "AddPlanForm":
              return <AddPlanForm />;
              case "ManageStatusTypingParagraph":
                return <ManageStatusTypingParagraph />;
                case "TypingInfo":
                  return <TypingInfo />;

      default:
        return <AddTypingParagraph />;
    }
  };

  return (
    <div className="admin-ebook">
      <AdminHeader
        toggleSidebar={toggleSidebar}
        sidebarVisible={sidebarVisible}
      />
      <div
        className={`admin-ebook__container ${
          sidebarVisible ? "" : "sidebar-hidden"
        }`}
      >
        {sidebarVisible && <SidebarEbook setComponent={setActiveComponent} />}
        <div className="admin-ebook__main-content">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AdminTyping;
