import React, { useEffect, useState } from "react";
import AdminShow from "./adminShow";
import SethAnimation from "../components/lottie/seth-animation";
import {
  getSubmittedApps,
  getPendingApps,
  getGradedApps,
  getInterviewBucketApps,
} from "../api/firebase/admin/admin_applications";
import "./styles/AdminStyles.scss";
import Previewapplication from "./previewApplication";
import { getAUser, getDataExport } from "../api/firebase/auth";
import { ArrowSeparateVertical } from "iconoir-react";

const AdminTable = ({ check, track, exportData, searchTerm, passmark = 0 }) => {
  const applicationsStack = {
    submitted: getSubmittedApps(track),
    pending: getPendingApps(track),
    graded: getGradedApps(track),
    interview: getInterviewBucketApps(track),
  };

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [previewShow, setPreviewShow] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [appUID, setAppID] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: "dateSubmitted",
    direction: "descending",
  });

  useEffect(() => {
    setIsLoading(true);

    if (check === "selected") {
      applicationsStack["interview"].then((e) => {
        setAllData(e);
        setData(e.slice(0, itemsPerPage));
        setCurrentPage(1);
        setIsLoading(false);
      });

      applicationsStack["interview"].then((e) => {
        exportData(e);
      });
    } else if (check === "interview") {
      applicationsStack["interview"].then((e) => {
        setAllData(e);
        setData(e.slice(0, itemsPerPage));
        setCurrentPage(1);
        setIsLoading(false);
      });
    } else {
      applicationsStack[check].then((e) => {
        setAllData(e);
        setData(e.slice(0, itemsPerPage));
        setCurrentPage(1);
        setIsLoading(false);
      });
    }
  }, [check, track]);

  useEffect(() => {
    setIsLoading(true);

    if (check === "selected") {
      applicationsStack["interview"].then((e) => {
        setAllData(e);
        setData(e.slice(0, itemsPerPage));
        setCurrentPage(1);
        setIsLoading(false);
      });
    } else {
      applicationsStack[check].then((e) => {
        setAllData(e);
        setData(e.slice(0, itemsPerPage));
        setCurrentPage(1);
        setIsLoading(false);
      });
    }

    // Reset sort config when filter changes
    setSortConfig({
      key: "dateSubmitted",
      direction: "descending",
    });
  }, [check, track]);

  const filteredData =
    searchTerm && searchTerm.trim() !== ""
      ? allData.filter((applicant) => {
          const fullName =
            `${applicant.data.firstname} ${applicant.data.lastname}`.toLowerCase();
          return fullName.includes(searchTerm.toLowerCase().trim());
        })
      : allData;

  useEffect(() => {
    setCurrentPage(1);
    const sortedFilteredData = getSortedData(filteredData);
    setData(sortedFilteredData.slice(0, itemsPerPage));
  }, [searchTerm, sortConfig]);

  useEffect(() => {
    const sortedFilteredData = getSortedData(filteredData);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(sortedFilteredData.slice(startIndex, endIndex));

    const newTotalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [itemsPerPage, currentPage, filteredData, sortConfig]);

  const handleRemoveItem = (removedId) => {
    // Remove the item from allData state
    setAllData((prevData) => prevData.filter((item) => item.id !== removedId));

    // Remove the item from current page data
    setData((prevData) => prevData.filter((item) => item.id !== removedId));
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const sortedFilteredData = getSortedData(filteredData);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(sortedFilteredData.slice(startIndex, endIndex));
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSort = (key) => {
    let newDirection = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      newDirection = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      newDirection = "ascending";
    }

    setSortConfig({ key, direction: newDirection });
  };

  const getSortedData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      let aValue = a.data[sortConfig.key];
      let bValue = b.data[sortConfig.key];

      // Handle date sorting
      if (sortConfig.key === "dateSubmitted") {
        aValue = aValue.toDate();
        bValue = bValue.toDate();
      }

      if (sortConfig.direction === "ascending") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sortedData;
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>,
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </button>,
    );

    return pages;
  };

  const previewUser = (data, appuid) => {
    //show the modal
    setPreviewShow(true);

    //set the data in for viewing
    setPreviewData(data);

    //set the appid
    setAppID(appuid);
  };

  const closePreviewUser = () => {
    //show the modal
    setPreviewShow(false);

    //set the data in for viewing
    setPreviewData({});
  };

  if (isLoading) {
    return (
      <div className="loadingData">
        <SethAnimation
          jsonSrc={
            "https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"
          }
          lottieStyle={{ width: "400px", height: "400px" }}
          speed={"1"}
        />
      </div>
    );
  }

  return (
    <div className="applications-council applicationAdmin">
      {previewShow ? (
        <div className="previewThisApp">
          <Previewapplication
            data={previewData}
            closeModal={closePreviewUser}
            appid={appUID}
          />
        </div>
      ) : null}

      <div className="tableHeaders itshead">
        <div
          className="tableHead sortable-header"
          onClick={() => handleSort("firstname")}
        >
          Fullname
          <span className="sort-arrow">
            <ArrowSeparateVertical fontSize={10} strokeWidth={1.5} />
          </span>
        </div>
        <div
          className="tableHead sortable-header"
          onClick={() => handleSort("dateSubmitted")}
        >
          Date Submitted
          <span className="sort-arrow">
            <ArrowSeparateVertical fontSize={10} strokeWidth={1.5} />
          </span>
        </div>
        <div className="tableHead"> Track </div>
        <div
          className="tableHead sortable-header"
          onClick={() => handleSort("avgGrade")}
        >
          Grade
          <span className="sort-arrow">
            <ArrowSeparateVertical fontSize={10} strokeWidth={1.5} />
          </span>
        </div>
        <div className="tableHead"></div>
      </div>

      {/* Applications Listings Here */}

      {data.length ? (
        <>
          <div className="table-list-container">
            {data.map((e, index) => {
              return (
                <AdminShow
                  data={e.data}
                  key={e.id}
                  showPrev={previewUser}
                  appuid={e.id}
                  check={check}
                  passmark={passmark}
                  setIsLoading={setIsLoading}
                  onRemove={handleRemoveItem}
                />
              );
            })}
          </div>
          <div className="pagination-container">
            <div className="table-controls">
              <div className="table-info">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
                {filteredData.length} entries
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>{renderPagination()}</div>

            <div className="items-per-page">
              <label htmlFor="itemsPerPage">Show:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="items-dropdown"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
          </div>
        </>
      ) : (
        <div className="no-data-state">
          <SethAnimation
            jsonSrc={
              "https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"
            }
            lottieStyle={{ width: "400px", height: "400px" }}
            speed={"1"}
          />

          <p> Oops! There are no applicants yet </p>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
