import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
import { ArrowRight } from "iconoir-react";

const OverAdmin = ({ check }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [previewShow, setPreviewShow] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [appUID, setAppID] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [authReady, setAuthReady] = useState(false);

  // Wait for auth before fetching
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthReady(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Only fetch when auth is confirmed
  useEffect(() => {
    if (!authReady) return;

    const applicationsStack = {
      submitted: getSubmittedApps("all"),
      pending: getPendingApps("all"),
      graded: getGradedApps("all"),
      interview: getInterviewBucketApps("all"),
    };

    applicationsStack[check].then((e) => {
      setAllData(e);
      setData(e.slice(0, itemsPerPage));
      setCurrentPage(1);
    });
  }, [check, authReady]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(allData.slice(startIndex, endIndex));

    const newTotalPages = Math.ceil(allData.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  }, [itemsPerPage, allData]);

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setData(allData.slice(startIndex, endIndex));
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const previewUser = (data, appuid) => {
    setPreviewShow(true);
    setPreviewData(data);
    setAppID(appuid);
  };

  const closePreviewUser = () => {
    setPreviewShow(false);
    setPreviewData({});
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
        <div className="tableHead"> Fullname </div>
        <div className="tableHead"> Date Submitted </div>
        <div className="tableHead"> Track </div>
        <div className="tableHead"> Grade </div>
        <div className="tableHead"></div>
      </div>

      {data.length ? (
        <>
          <div className="table-list-container">
            {data.map((e, index) => (
              <AdminShow
                data={e.data}
                key={e.id}
                showPrev={previewUser}
                appuid={e.id}
              />
            ))}
          </div>
          <a
            href="/admin/applications"
            style={{
              position: "absolute",
              left: "50%",
              translateX: "-50%",
              marginTop: 10,
              background: "#fff",
              border: "1px solid #eee",
              padding: "14px 24px",
              boxShadow: "1px 3px 20px rgba(0,0,0,0.02)",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              color: "#131313",
            }}
          >
            View All Applications{" "}
            <ArrowRight fontSize={10} style={{ marginTop: 2 }} />
          </a>
        </>
      ) : (
        <div className="no-data-state">
          <SethAnimation
            jsonSrc="https://assets10.lottiefiles.com/packages/lf20_EMTsq1.json"
            lottieStyle={{ width: "400px", height: "400px" }}
            speed="1"
          />
          <p>Oops! There are no applicants yet</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination-container">{renderPagination()}</div>
      )}
    </div>
  );
};

export default OverAdmin;
