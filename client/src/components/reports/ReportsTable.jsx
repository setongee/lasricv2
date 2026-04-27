import React, { useState, useEffect, useCallback } from "react";
import { getUserReports, deleteReport } from "../../api/firebase/reports";
import { formatDistanceToNow } from "date-fns";
import "./ReportsTable.css";
import { GoogleDocs } from "iconoir-react";

const ReportsTable = ({ uid, onAddReport, onEditReport, onViewReport }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch reports
  const fetchReports = useCallback(
    async (reset = false) => {
      setLoading(true);
      try {
        const result = await getUserReports(
          uid,
          searchQuery,
          pageLimit,
          reset ? null : lastVisible,
        );

        if (result.status === "ok") {
          if (reset) {
            setReports(result.data);
            setLastVisible(result.lastVisible);
          } else {
            setReports((prev) => [...prev, ...result.data]);
          }
          setHasMore(result.hasMore);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    },
    [uid, searchQuery, pageLimit],
  );

  // Initial fetch and search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setReports([]);
      setLastVisible(null);
      setCurrentPage(1);
      fetchReports(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, pageLimit, uid]); // Remove fetchReports from dependencies

  // Load more pages
  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage((prev) => prev + 1);
      fetchReports(false);
    }
  };

  // Handle delete
  const handleDelete = async (reportId) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setDeleting(reportId);
      try {
        const result = await deleteReport(reportId);
        if (result.status === "ok") {
          setReports((prev) => prev.filter((report) => report.id !== reportId));
          setShowDropdown(null);
        } else {
          alert("Failed to delete report: " + result.message);
        }
      } catch (error) {
        console.error("Error deleting report:", error);
        alert("Failed to delete report");
      } finally {
        setDeleting(null);
      }
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Safe date formatting
  const safeFormatDate = (dateValue) => {
    try {
      if (!dateValue) return "Unknown date";

      const date = new Date(dateValue);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn("Invalid date value:", dateValue);
        return "Invalid date";
      }

      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error, dateValue);
      return "Date error";
    }
  };

  // Toggle dropdown
  const toggleDropdown = (reportId) => {
    setShowDropdown(showDropdown === reportId ? null : reportId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (loading && reports.length === 0) {
    return (
      <div className="reports-table-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-table-container">
      {/* Header with search and add button */}
      <div className="reports-header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search reports by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="header-actions">
          <select
            value={pageLimit}
            onChange={(e) => setPageLimit(Number(e.target.value))}
            className="page-limit-select"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>

          <button onClick={onAddReport} className="add-report-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add Report
          </button>
        </div>
      </div>

      {/* Empty state */}
      {reports.length === 0 && !loading ? (
        <div className="empty-state">
          <svg
            className="empty-icon"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 13H6M9 17H6M19 7L12 14L9 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <h3>No reports found</h3>
          <p>Start by adding your first report to share with LASRIC</p>
          <button onClick={onAddReport} className="add-report-btn primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add Report
          </button>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="table-wrapper">
            <table className="reports-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Report Name</th>
                  <th>Last Submitted</th>
                  <th>Target</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report.id}>
                    <td className="index-number">{index + 1}</td>
                    <td className="report-name">
                      <div className="report-name-cell">
                        <GoogleDocs fontSize={12} />
                        <span>{report.reportName}</span>
                      </div>
                    </td>
                    <td className="date">
                      {safeFormatDate(report.lastSubmitted)}
                    </td>
                    <td className="target">{report.reportTarget}</td>
                    <td className="file-info-file">
                      {report.fileName && (
                        <div className="file-details">
                          <span className="file-name">{report.fileName}</span>
                          <span className="file-size">
                            {formatFileSize(report.fileSize)}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="actions">
                      <div className="dropdown-container">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(report.id);
                          }}
                          className="actions-btn"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle cx="12" cy="12" r="1" fill="currentColor" />
                            <circle cx="12" cy="5" r="1" fill="currentColor" />
                            <circle cx="12" cy="19" r="1" fill="currentColor" />
                          </svg>
                        </button>

                        {showDropdown === report.id && (
                          <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                onViewReport(report);
                                setShowDropdown(null);
                              }}
                              className="dropdown-item"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              View Report
                            </button>
                            <button
                              onClick={() => {
                                onEditReport(report);
                                setShowDropdown(null);
                              }}
                              className="dropdown-item"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89783 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Edit Report
                            </button>
                            <button
                              onClick={() => handleDelete(report.id)}
                              className="dropdown-item delete"
                              disabled={deleting === report.id}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              {deleting === report.id ? "Deleting..." : "Delete Report"}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Load more button */}
          {hasMore && (
            <div className="load-more-container">
              <button
                onClick={loadMore}
                disabled={loading}
                className="load-more-btn"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReportsTable;
