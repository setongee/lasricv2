import React from "react";
import "./ViewReportModal.css";

const ViewReportModal = ({ isOpen, onClose, report }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    try {
      if (!dateString) return "Unknown date";

      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.warn("Invalid date value:", dateString);
        return "Invalid date";
      }

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return "Date error";
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) return "📄";
    if (fileType.includes("word") || fileType.includes("document")) return "📝";
    if (fileType.includes("excel") || fileType.includes("spreadsheet"))
      return "📊";
    if (fileType.includes("powerpoint") || fileType.includes("presentation"))
      return "📈";
    if (fileType.includes("image")) return "🖼️";
    return "📄";
  };

  const handleDownload = () => {
    if (report.fileUrl) {
      window.open(report.fileUrl, "_blank");
    }
  };

  if (!isOpen || !report) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container view-modal">
        <div className="modal-header">
          <h2>Report Details</h2>
          <button onClick={onClose} className="close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="report-info-grid">
            <div className="info-group">
              <label>Report Name</label>
              <div className="info-value">{report.reportName}</div>
            </div>

            <div className="info-group">
              <label>Report Target</label>
              <div className="info-value">{report.reportTarget}</div>
            </div>

            <div className="info-group">
              <label>Date Created</label>
              <div className="info-value">{formatDate(report.createdAt)}</div>
            </div>

            <div className="info-group">
              <label>Last Modified</label>
              <div className="info-value">
                {formatDate(report.lastModified)}
              </div>
            </div>

            <div className="info-group">
              <label>Last Submitted</label>
              <div className="info-value">
                {formatDate(report.lastSubmitted)}
              </div>
            </div>

            {report.fileName && (
              <div className="info-group file-info">
                <label>Document</label>
                <div className="file-details">
                  <div className="file-icon">
                    {getFileIcon(report.fileType)}
                  </div>
                  <div className="file-meta">
                    <div className="file-name">{report.fileName}</div>
                    <div className="file-size">
                      {formatFileSize(report.fileSize)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {report.fileUrl && (
            <div className="modal-actions">
              <button onClick={handleDownload} className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 10L12 15L17 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15V3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReportModal;
