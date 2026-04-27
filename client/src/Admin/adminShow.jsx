import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavArrowDown } from "iconoir-react";
import {
  manuallyAddToInterviewBucket,
  removeFromInterviewBucket,
} from "../api/firebase/admin/admin_applications";
import { notify } from "../utils/toast";

const AdminShow = ({
  data,
  showPrev,
  appuid,
  check,
  passmark,
  setIsLoading,
  onRemove,
}) => {
  const INIT_1 = data.firstname.split("")[0].toUpperCase();
  const INIT_2 = data.lastname.split("")[0].toUpperCase();
  const FULLINIT = `${INIT_1}${INIT_2}`;

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  var dateSubmitted = data.dateSubmitted.toDate().toDateString();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleAction = (action, e) => {
    e.stopPropagation();
    setShowDropdown(false);

    switch (action) {
      case "view":
        showPrev(data, appuid);
        break;
      case "addToInterview":
        setIsLoading(true);
        manuallyAddToInterviewBucket(appuid).then(() => {
          setIsLoading(false);
          notify.success("Application added to interview bucket");
        });
        break;
      case "removeFromBucket":
        setIsLoading(true);
        removeFromInterviewBucket(appuid).then(() => {
          setIsLoading(false);
          notify.success("Application removed from interview bucket");
          if (onRemove) {
            onRemove(appuid);
          }
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="tableHeaders information">
      <div className="tableHead avarta" style={{ textTransform: "capitalize" }}>
        {" "}
        <div
          className="cardMe"
          style={{
            backgroundColor: `${data.track === "stem" ? "#037B9C" : data.track === "innovation" ? "#9C6E03" : "#419C03"}`,
          }}
        >
          {" "}
          {FULLINIT}
        </div>{" "}
        {data.firstname} {data.lastname}
      </div>

      <div className="tableHead"> {dateSubmitted} </div>

      <div className="tableHead"> {data.track} </div>
      <div className="tableHead"> {Math.round(data.avgGrade * 10) / 10}% </div>

      <div className="tableHead">
        <div
          className="action-dropdown"
          ref={dropdownRef}
          style={{
            position: "relative",
          }}
        >
          <button
            className="action-btn"
            onClick={toggleDropdown}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              background: "#fff",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Actions <NavArrowDown style={{ marginTop: 3 }} fontSize={12} />
          </button>

          {showDropdown && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                right: "0",
                top: "100%",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                zIndex: 9999,
                width: "200px",
                marginTop: "4px",
                padding: 10,
              }}
            >
              <div
                className="dropdown-item"
                onClick={(e) => handleAction("view", e)}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "13px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                View Application
              </div>

              {check === "graded" &&
                Math.round(data.avgGrade * 10) / 10 < passmark && (
                  <div
                    className="dropdown-item"
                    onClick={(e) => handleAction("addToInterview", e)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    Add to Interview Bucket
                  </div>
                )}

              {check === "interview" &&
                data?.manuallyAddedToInterview === true && (
                  <div
                    className="dropdown-item"
                    onClick={(e) => handleAction("removeFromBucket", e)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: "13px",
                      color: "#d32f2f",
                    }}
                  >
                    Remove from Bucket
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminShow;
