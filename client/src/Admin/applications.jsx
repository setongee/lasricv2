import React, { useState, useEffect } from "react";
import AdminTable from "./adminTables";
import { CSVLink } from "react-csv";
import {
  getCurrentCohortNumber,
  getPassmark,
} from "../api/firebase/admin/admin_applications";

const Applications = () => {
  const [track, setTrack] = useState("all");
  const [cohort, setCohort] = useState(0);
  const [filterContent, setFilterContent] = useState("submitted");
  const [searchTerm, setSearchTerm] = useState("");
  const [passmark, setPassMark] = useState(0);

  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Email", key: "email" },
    { label: "Phone Number", key: "phone" },
    { label: "Track", key: "track" },
    { label: "Average Grading", key: "grade_export" },
    { label: "Company Name / School Name", key: "companySector" },
  ];

  const [dataExport, setDataExport] = useState([]);

  const DataExport = async (red) => {
    if (dataExport.length) {
      setDataExport([]);

      red.forEach((dataUser) => {
        setDataExport((data) => [...data, dataUser.data]);
      });
    } else {
      red.forEach((dataUser) => {
        setDataExport((data) => [...data, dataUser.data]);
      });
    }
  };

  useEffect(() => {
    getPassmark().then((e) => setPassMark(e.grade));
    getCurrentCohortNumber().then((e) => setCohort(e[0].present));
  }, []);

  return (
    <div className="overviewAdmin applicationsPage">
      <div className="tableInfo">
        <div className="filters">
          <li
            className={`submitted ${filterContent === "submitted" && "active-application"}`}
            onClick={() => setFilterContent("submitted")}
          >
            All Applications
          </li>
          <li
            className={`pending ${filterContent === "pending" && "active-application"}`}
            onClick={() => setFilterContent("pending")}
          >
            Pending
          </li>
          <li
            className={`graded ${filterContent === "graded" && "active-application"}`}
            onClick={() => setFilterContent("graded")}
          >
            Graded
          </li>
          <li
            className={`interview ${filterContent === "interview" && "active-application"}`}
            onClick={() => setFilterContent("interview")}
          >
            Interview Bucket
          </li>
        </div>

        <div className="filterTrack">
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search by applicant name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="searchInput"
            />
            <select
              name="filter"
              id="filter"
              onChange={(e) => setTrack(e.target.value)}
            >
              <option value="all"> All Applications </option>
              <option value="stem"> Stem Applications </option>
              <option value="innovation"> Innovation Applications </option>
              <option value="research"> Research Applications </option>
            </select>
          </div>

          <CSVLink
            data={dataExport}
            headers={headers}
            filename={`LASRIC Cohort${cohort}_${track}_${filterContent} Applications_Export.csv`}
            className="btn_download"
          >
            {" "}
            Export Applications
          </CSVLink>
        </div>
      </div>

      <AdminTable
        check={filterContent}
        track={track}
        exportData={DataExport}
        searchTerm={searchTerm}
        passmark={passmark}
      />
    </div>
  );
};

export default Applications;
