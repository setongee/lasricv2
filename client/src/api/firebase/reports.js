import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "./config";

// Create a new report
export const createReport = async (reportData, file) => {
  try {
    // Generate unique report ID
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Upload file if provided
    let fileUrl = "";
    let fileName = "";
    let fileSize = 0;
    let fileType = "";

    if (file) {
      const storageRef = ref(
        storage,
        `reports/${reportData.uid}/${reportId}_${file.name}`,
      );
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
      fileName = file.name;
      fileSize = file.size;
      fileType = file.type;
    }

    // Create report document
    const reportDoc = {
      id: reportId,
      uid: reportData.uid,
      reportName: reportData.reportName,
      reportTarget: reportData.reportTarget,
      fileUrl,
      fileName,
      fileSize,
      fileType,
      createdAt: new Date(),
      lastModified: new Date(),
      lastSubmitted: new Date(),
    };

    await setDoc(doc(db, "reports", reportId), reportDoc);

    return {
      status: "ok",
      message: "Report created successfully!",
      data: reportDoc,
    };
  } catch (error) {
    console.error("Error creating report:", error);
    return {
      status: "error",
      message: "Failed to create report",
      error: error.message,
    };
  }
};

// Get all reports for a user with pagination and search
export const getUserReports = async (
  uid,
  searchQuery = "",
  pageLimit = 10,
  lastDoc = null,
) => {
  try {
    let reportsQuery = collection(db, "reports");

    // Build query - always filter by uid first
    reportsQuery = query(
      reportsQuery,
      where("uid", "==", uid),
      orderBy("lastSubmitted", "desc"),
      limit(pageLimit),
    );

    // Add pagination if lastDoc is provided
    if (lastDoc) {
      reportsQuery = query(reportsQuery, startAfter(lastDoc));
    }

    const querySnapshot = await getDocs(reportsQuery);
    let reports = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      reports.push({
        id: doc.id,
        ...data,
        // Ensure dates are properly converted
        createdAt: data.createdAt?.toDate?.() || data.createdAt,
        lastModified: data.lastModified?.toDate?.() || data.lastModified,
        lastSubmitted: data.lastSubmitted?.toDate?.() || data.lastSubmitted,
      });
    });

    // Filter by search query on client side if provided
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      reports = reports.filter((report) =>
        report.reportName.toLowerCase().includes(searchLower),
      );
    }

    // Get last document for pagination (only if we didn't filter client-side)
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      status: "ok",
      data: reports,
      lastVisible: lastVisible || null,
      hasMore: querySnapshot.docs.length === pageLimit && !searchQuery,
    };
  } catch (error) {
    console.error("Error fetching reports:", error);
    return {
      status: "error",
      message: "Failed to fetch reports",
      error: error.message,
    };
  }
};

// Get a single report by ID
export const getReportById = async (reportId) => {
  try {
    const reportDoc = await getDoc(doc(db, "reports", reportId));

    if (reportDoc.exists()) {
      const data = reportDoc.data();
      return {
        status: "ok",
        data: {
          id: reportDoc.id,
          ...data,
          // Ensure dates are properly converted
          createdAt: data.createdAt?.toDate?.() || data.createdAt,
          lastModified: data.lastModified?.toDate?.() || data.lastModified,
          lastSubmitted: data.lastSubmitted?.toDate?.() || data.lastSubmitted,
        },
      };
    } else {
      return {
        status: "error",
        message: "Report not found",
      };
    }
  } catch (error) {
    console.error("Error fetching report:", error);
    return {
      status: "error",
      message: "Failed to fetch report",
      error: error.message,
    };
  }
};

// Update a report
export const updateReport = async (reportId, updateData, newFile = null) => {
  try {
    const updateFields = {
      ...updateData,
      lastModified: new Date(),
    };

    // Handle file update if new file is provided
    if (newFile) {
      // Delete old file if it exists
      const existingReport = await getReportById(reportId);
      if (existingReport.status === "ok" && existingReport.data.fileUrl) {
        try {
          const oldFileRef = ref(storage, existingReport.data.fileUrl);
          await deleteObject(oldFileRef);
        } catch (error) {
          console.warn("Failed to delete old file:", error);
        }
      }

      // Upload new file
      const storageRef = ref(
        storage,
        `reports/${updateData.uid}/${reportId}_${newFile.name}`,
      );
      const snapshot = await uploadBytes(storageRef, newFile);
      const fileUrl = await getDownloadURL(snapshot.ref);

      updateFields.fileUrl = fileUrl;
      updateFields.fileName = newFile.name;
      updateFields.fileSize = newFile.size;
      updateFields.fileType = newFile.type;
    }

    await updateDoc(doc(db, "reports", reportId), updateFields);

    return {
      status: "ok",
      message: "Report updated successfully!",
    };
  } catch (error) {
    console.error("Error updating report:", error);
    return {
      status: "error",
      message: "Failed to update report",
      error: error.message,
    };
  }
};

// Delete a report
export const deleteReport = async (reportId) => {
  try {
    // Get report data to delete associated file
    const report = await getReportById(reportId);

    if (report.status === "ok") {
      // Delete file from storage if it exists
      if (report.data.fileUrl) {
        try {
          const fileRef = ref(storage, report.data.fileUrl);
          await deleteObject(fileRef);
        } catch (error) {
          console.warn("Failed to delete file:", error);
        }
      }

      // Delete report document
      await deleteDoc(doc(db, "reports", reportId));

      return {
        status: "ok",
        message: "Report deleted successfully!",
      };
    } else {
      return {
        status: "error",
        message: "Report not found",
      };
    }
  } catch (error) {
    console.error("Error deleting report:", error);
    return {
      status: "error",
      message: "Failed to delete report",
      error: error.message,
    };
  }
};

// Get total count of user reports
export const getUserReportsCount = async (uid) => {
  try {
    const reportsQuery = query(
      collection(db, "reports"),
      where("uid", "==", uid),
    );

    const querySnapshot = await getDocs(reportsQuery);

    return {
      status: "ok",
      count: querySnapshot.size,
    };
  } catch (error) {
    console.error("Error getting reports count:", error);
    return {
      status: "error",
      message: "Failed to get reports count",
      error: error.message,
    };
  }
};
