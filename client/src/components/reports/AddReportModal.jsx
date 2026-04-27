import React, { useState, useRef } from 'react';
import { createReport } from '../../api/firebase/reports';
import './AddReportModal.css';

const AddReportModal = ({ isOpen, onClose, uid, onSuccess }) => {
  const [formData, setFormData] = useState({
    reportName: '',
    reportTarget: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Reset form
  const resetForm = () => {
    setFormData({
      reportName: '',
      reportTarget: ''
    });
    setSelectedFile(null);
    setErrors({});
    setDragActive(false);
  };

  // Close modal and reset form
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle file selection
  const handleFileSelect = (file) => {
    if (file) {
      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          file: 'File size must be less than 10MB'
        }));
        return;
      }
      
      setSelectedFile(file);
      setErrors(prev => ({
        ...prev,
        file: ''
      }));
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.reportName.trim()) {
      newErrors.reportName = 'Report name is required';
    }
    
    if (!formData.reportTarget.trim()) {
      newErrors.reportTarget = 'Report target is required';
    }
    
    if (!selectedFile) {
      newErrors.file = 'Please select a file to upload';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setUploading(true);
    
    try {
      const reportData = {
        uid,
        reportName: formData.reportName.trim(),
        reportTarget: formData.reportTarget.trim()
      };
      
      const result = await createReport(reportData, selectedFile);
      
      if (result.status === 'ok') {
        onSuccess(result.data);
        handleClose();
      } else {
        setErrors(prev => ({
          ...prev,
          submit: result.message || 'Failed to create report'
        }));
      }
    } catch (error) {
      console.error('Error creating report:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'An unexpected error occurred'
      }));
    } finally {
      setUploading(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return '📈';
    if (fileType.includes('image')) return '🖼️';
    return '📄';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Report</h2>
          <button onClick={handleClose} className="close-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="reportName">Report Name *</label>
            <input
              type="text"
              id="reportName"
              name="reportName"
              value={formData.reportName}
              onChange={handleInputChange}
              placeholder="Enter report name"
              className={`form-input ${errors.reportName ? 'error' : ''}`}
              disabled={uploading}
            />
            {errors.reportName && <span className="error-message">{errors.reportName}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="reportTarget">Report Target *</label>
            <input
              type="text"
              id="reportTarget"
              name="reportTarget"
              value={formData.reportTarget}
              onChange={handleInputChange}
              placeholder="Enter report target"
              className={`form-input ${errors.reportTarget ? 'error' : ''}`}
              disabled={uploading}
            />
            {errors.reportTarget && <span className="error-message">{errors.reportTarget}</span>}
          </div>
          
          <div className="form-group">
            <label>Document Upload *</label>
            <div
              className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${errors.file ? 'error' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.bmp,.webp"
                disabled={uploading}
                style={{ display: 'none' }}
              />
              
              {selectedFile ? (
                <div className="selected-file">
                  <div className="file-info">
                    <span className="file-icon">{getFileIcon(selectedFile.type)}</span>
                    <div className="file-details">
                      <span className="file-name">{selectedFile.name}</span>
                      <span className="file-size">{formatFileSize(selectedFile.size)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="remove-file-btn"
                    disabled={uploading}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="upload-prompt">
                  <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 13V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>Drop your file here or <span className="browse-link">browse</span></p>
                  <p className="upload-hint">Supports PDF, Word, Excel, PowerPoint, and images (Max 10MB)</p>
                </div>
              )}
            </div>
            {errors.file && <span className="error-message">{errors.file}</span>}
          </div>
          
          {errors.submit && (
            <div className="form-error">
              {errors.submit}
            </div>
          )}
          
          <div className="modal-actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-secondary"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <div className="btn-spinner"></div>
                  Creating Report...
                </>
              ) : (
                'Create Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReportModal;
