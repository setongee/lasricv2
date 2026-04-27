import { type } from "@testing-library/user-event/dist/type";
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  deleteDoc,
  addDoc,
  where,
  query,
  orderBy,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAUser } from "../auth";
import { db } from "../config";

//COUNCIL INFORMATION

export const setCouncilInfomation = async (uid, data) => {
  const docRef = doc(db, "council", uid);

  await setDoc(docRef, data);
};

//User 2 INFORMATION

// export const setUser2InUsers = async () => {
//   const newCounciilRef = await collection(db, "submittedApplications");
//   const queryUsers = await getDocs(newCounciilRef);

//   queryUsers.forEach((user) => {
//     setUsersInUser2(user.id, user.data());
//   });
// };

// export const Godwin = async () => {
//   const newCounciilRef = await collection(
//     db,
//     "submitted_applications_beta",
//     "cohort5",
//     "applications",
//   );
//   const queryUsers = await getDocs(newCounciilRef);

//   //console.log(queryUsers)

//   //console.log("mhen")
// };

// export const updateSubApps = async (uid, id) => {
//   const result = await fixSubmittedApps().then((res) => res);

//   console.log(result);

//   result.forEach((app) => {
//     const docRef = doc(
//       db,
//       "submitted_applications_beta",
//       "cohort5",
//       "applications",
//       `LASRIC_${app.callID}_${app.uid}`,
//     );
//     // const response = getDoc(docRef);

//     // console.log(app.data.education.data.school)

//     // if (app.data.education.data.school !== undefined) {

//     //     updateDoc(docRef, { "companySector" : app.data.education.data.school });

//     // }

//     // response.then( play => {

//     //     updateDoc(docRef, { "companySector" : `${Math.round(play.data().avgGrade * 10) / 10}%` });

//     // })

//     // getAUser(app.data.uid)
//     // .then(res => {

//     //     //updateDoc(docRef, { "grade_export" : Math.round(response_data * 10) / 10% });

//     // })

//     //fg

//     console.log(app.avgGrade);

//     updateDoc(docRef, {
//       grade_export: `${Math.round(app.avgGrade * 10) / 10}%`,
//     });
//   });
// };

// export const fixSubmittedApps = async (track) => {
//   //const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

//   const bintConv = collection(
//     db,
//     "submitted_applications_beta",
//     "cohort5",
//     "applications",
//   );
//   const querySnapshot = await getDocs(bintConv);

//   const allApplications = [];

//   querySnapshot.forEach((doc) => {
//     allApplications.push(doc.data());
//   });

//   return allApplications;
// };

// //fixSubmittedApps()

// //updateSubApps()

// export const fixSubmittedApps2 = async (track) => {
//   //const cohortN = await getCurrentCohortNumber().then(cohortNum => cohortNum[0].present)

//   const bintConv = collection(
//     db,
//     "applications_data",
//     "cohort5",
//     "applications",
//   );
//   const querySnapshot = await getDocs(bintConv);

//   const allApplications = [];
//   const emails = [];

//   querySnapshot.forEach(async (res) => {
//     const docRef = doc(db, "users", res.data().userid);
//     const docSnap = await getDoc(docRef);

//     updateApps(docSnap.data().email, docSnap.data().phone, res.data().uid);

//     //console.log(res.data().uid)
//   });
// };

// //fixSubmittedApps2()

// const updateApps = async (email, phone, uid) => {
//   const bintConv = doc(db, "applications_data", "cohort5", "applications", uid);
//   updateDoc(bintConv, { email: email });
//   updateDoc(bintConv, { phone: phone });
// };

// export const setUsersInUser2 = async (uid, data) => {
//   const docRef = doc(
//     db,
//     "submitted_applications_beta",
//     "cohort4",
//     "applications",
//     uid,
//   );
//   await setDoc(docRef, data);
// };

//setUser2InUsers()

//Add COUNCIL INFORMATION

// export const addNewCouncil = async (data) => {

//     const newCounciilRef = await addDoc(collection(db, "council"), data)

//     const councilCreated = await doc(db, "council", newCounciilRef.id);

//     await updateDoc(councilCreated, {

//         uid: newCounciilRef.id

//     });

// }

export const deleteFunction = async (document, uid) => {
  await deleteDoc(doc(db, document, uid));
};

//deleteFunction("submittedApplications", "LASRIC_j7njo6aTElgYdPXCAqPc_0xFpjEhEkoZFYp5ipkcISjGa3OG2")

//GET ALL USERS

export const getOverviewStats = async () => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  try {
    // Get all required data in parallel
    const [
      usersSnapshot,
      applicationsSnapshot,
      submittedAppsSnapshot,
      passmarkData,
    ] = await Promise.all([
      getDocs(query(collection(db, "users"), where("type", "==", "user"))),
      getDocs(
        collection(db, "applications_data", `cohort${cohortN}`, "applications"),
      ),
      getDocs(
        collection(
          db,
          "submitted_applications_beta",
          `cohort${cohortN}`,
          "applications",
        ),
      ),
      getPassmark(),
    ]);

    const users = usersSnapshot.docs.map((doc) => doc.data());
    const applications = applicationsSnapshot.docs.map((doc) => doc.data());
    const submittedApps = submittedAppsSnapshot.docs.map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }));
    const passmark = passmarkData.grade;

    // Process all stats from the single submittedApps query
    const stats = {
      users: users.length,
      applications: applications.length,
      submitted: submittedApps.length,
      pending: submittedApps.filter((app) => app.data.avgGrade === 0).length,
      graded: submittedApps.filter((app) => app.data.avgGrade > 0).length,
      unsubmitted: applications.filter((app) => !app.submitted).length,
      councilGraded: Math.max(
        ...submittedApps.map(
          (app) => Object.keys(app.data.grades || {}).length,
        ),
        0,
      ),
      interviewBucket: submittedApps.filter(
        (app) => app.data.avgGrade >= passmark,
      ).length,
      currentCohort: Number(cohortN),
    };

    return stats;
  } catch (error) {
    console.error("Error fetching overview stats:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const fetchUsers = query(
    collection(db, "users"),
    where("type", "==", "user"),
  );
  const querySnapshot = await getDocs(fetchUsers);

  const allUsers = [];

  querySnapshot.forEach((doc) => {
    allUsers.push(doc.data());
  });

  return allUsers;
};

// GET ALL APLLICATIONS

export const getApplicationsNumber = async () => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const fetchApplications = collection(
    db,
    "applications_data",
    `cohort${cohortN}`,
    "applications",
  );
  const querySnapshot = await getDocs(fetchApplications);

  const allApplications = [];

  querySnapshot.forEach((doc) => {
    allApplications.push(doc.data());
  });

  return allApplications;
};

// GET Council Graded APLLICATIONS

export const getCouncilGradedApps = async () => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const fetchApplications = collection(
    db,
    "submitted_applications_beta",
    `cohort${cohortN}`,
    "applications",
  );
  const querySnapshot = await getDocs(fetchApplications);

  const allApplications = [];

  querySnapshot.forEach((doc) => {
    allApplications.push(Object.keys(doc.data().grades).length);
  });

  return allApplications;
};

// GET ALL UNSUBMITTED APPS

export const getAllUnsubmittedApps = async () => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const fetchUnsubmitted = query(
    collection(
      db,
      "submitted_applications_beta",
      `cohort${cohortN}`,
      "applications",
    ),
    where("submitted", "==", false),
  );
  const querySnapshot = await getDocs(fetchUnsubmitted);

  const allUnsubmitted = [];

  querySnapshot.forEach((doc) => {
    allUnsubmitted.push(doc.data());
  });

  return allUnsubmitted;
};

// GET SUBMITTED APPS

export const getSubmittedApps = async (track) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const allSubmittedApplications = [];

  if (track !== "all") {
    const querySnapshot = await getDocs(
      query(
        collection(
          db,
          "submitted_applications_beta",
          `cohort${cohortN}`,
          "applications",
        ),
        where("track", "==", track),
        orderBy("avgGrade", "desc"),
      ),
    );

    querySnapshot.forEach((doc) => {
      allSubmittedApplications.push({ data: doc.data(), id: doc.id });
    });
  } else {
    const querySnapshot = await getDocs(
      query(
        collection(
          db,
          "submitted_applications_beta",
          `cohort${cohortN}`,
          "applications",
        ),
        orderBy("avgGrade", "desc"),
      ),
    );

    querySnapshot.forEach((doc) => {
      allSubmittedApplications.push({ data: doc.data(), id: doc.id });
    });
  }

  return allSubmittedApplications;
};

export const overviewSubmitted = async () => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const allSubmittedApplications = [];

  const querySnapshot = await getDocs(
    query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      orderBy("avgGrade", "desc"),
    ),
  );

  querySnapshot.forEach((doc) => {
    allSubmittedApplications.push({ data: doc.data(), id: doc.id });
  });

  return allSubmittedApplications;
};

// GET Interview Bucket APPS

export const getInterviewBucketApps = async (track) => {
  const passmark = await getPassmark().then((e) => e.grade);
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = [];

  // Query 1: Applications that meet passmark criteria (automatically added)
  if (track !== "all") {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("track", "==", track),
      where("avgGrade", ">=", passmark),
      orderBy("avgGrade", "desc"),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  } else {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("avgGrade", ">=", passmark),
      orderBy("avgGrade", "desc"),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  }

  // Query 2: Applications manually added to interview bucket (regardless of grade)
  const manuallyAddedQuery = query(
    collection(
      db,
      "submitted_applications_beta",
      `cohort${cohortN}`,
      "applications",
    ),
    where("manuallyAddedToInterview", "==", true),
  );

  if (track !== "all") {
    const trackSpecificManualQuery = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("track", "==", track),
      where("manuallyAddedToInterview", "==", true),
    );

    const manualQuerySnapshot = await getDocs(trackSpecificManualQuery);

    manualQuerySnapshot.forEach((doc) => {
      // Avoid duplicates - only add if not already in data
      if (!data.find((item) => item.id === doc.id)) {
        data.push({ data: doc.data(), id: doc.id });
      }
    });
  } else {
    const manualQuerySnapshot = await getDocs(manuallyAddedQuery);

    manualQuerySnapshot.forEach((doc) => {
      // Avoid duplicates - only add if not already in data
      if (!data.find((item) => item.id === doc.id)) {
        data.push({ data: doc.data(), id: doc.id });
      }
    });
  }

  // Sort final data by avgGrade (descending) to maintain order
  data.sort((a, b) => b.data.avgGrade - a.data.avgGrade);

  return data;
};

// Function to manually add application to interview bucket
export const manuallyAddToInterviewBucket = async (applicationId) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const applicationRef = doc(
    db,
    "submitted_applications_beta",
    `cohort${cohortN}`,
    "applications",
    applicationId,
  );

  // Update the application to mark it as manually added to interview bucket
  await updateDoc(applicationRef, {
    manuallyAddedToInterview: true,
    interviewBucketAddedAt: new Date(),
  });

  return {
    status: "ok",
    message: "Application manually added to interview bucket successfully!",
  };
};

// Function to remove application from interview bucket
export const removeFromInterviewBucket = async (applicationId) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const applicationRef = doc(
    db,
    "submitted_applications_beta",
    `cohort${cohortN}`,
    "applications",
    applicationId,
  );

  // Remove the manual addition flag
  await updateDoc(applicationRef, {
    manuallyAddedToInterview: false,
    interviewBucketAddedAt: null,
  });

  return {
    status: "ok",
    message: "Application removed from interview bucket successfully!",
  };
};

export const getPotentiaalApps = async () => {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized: Admin access required");
  }
  const passmark = await getPassmark().then((e) => e.grade);
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = [];

  const fetchBucket = query(
    collection(
      db,
      "submitted_applications_beta",
      `cohort${cohortN}`,
      "applications",
    ),
    where("grade", "==", 0),
    where("avgGrade", ">=", passmark),
    orderBy("avgGrade", "desc"),
  );

  const querySnapshot = await getDocs(fetchBucket);

  querySnapshot.forEach((doc) => {
    data.push({ data: doc.data(), id: doc.id });
  });

  return data;
};

export const getAwardees = async () => {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized: Admin access required");
  }
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = [];

  const fetchBucket = collection(
    db,
    "awardees",
    `cohort${cohortN}`,
    "applicants",
  );

  const querySnapshot = await getDocs(fetchBucket);

  querySnapshot.forEach((doc) => {
    data.push({ data: doc.data(), id: doc.id });
  });

  return data;
};

export const removeAwardee = async (uid) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  try {
    // 1. Delete the record from the awardees collection
    const awardeeDocRef = doc(
      db,
      "awardees",
      `cohort${cohortN}`,
      "applicants",
      uid,
    );
    await deleteDoc(awardeeDocRef);

    // 2. Update the application status back to 0 and get the application ID
    const applicationId = await updateStatusOnApplicationRemoval(uid);

    // 3. Delete the record from the awardeesBank
    const awardeeBankDocRef = doc(db, "awardeesBank", uid);
    await deleteDoc(awardeeBankDocRef);

    return {
      status: "ok",
      message: "Awardee removed successfully!",
      applicationId: applicationId,
    };
  } catch (error) {
    console.error("Error removing awardee:", error);
    return {
      status: "error",
      message: "Failed to remove awardee",
      error: error.message,
    };
  }
};

const updateStatusOnApplicationRemoval = async (uid) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  // Find the application document by querying for the uid
  const applicationsRef = collection(
    db,
    "submitted_applications_beta",
    `cohort${cohortN}`,
    "applications",
  );
  const q = query(applicationsRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const applicationDoc = querySnapshot.docs[0];
    const applicationId = applicationDoc.id;

    // Update the grade back to 0
    const documentRef = doc(
      db,
      "submitted_applications_beta",
      `cohort${cohortN}`,
      "applications",
      applicationId,
    );
    await updateDoc(documentRef, { grade: 0 });

    return applicationId;
  } else {
    throw new Error(`Application not found for uid: ${uid}`);
  }
};

export const addAwardees = async (payload, aid) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const docRef = doc(
    db,
    "awardees",
    `cohort${cohortN}`,
    "applicants",
    payload.uid,
  );

  await setDoc(docRef, payload);

  updateStatusOnApplication(aid, payload.uid);

  return {
    status: "ok",
    message: "Awardee(s) added successfully!",
  };
};

const updateStatusOnApplication = async (aid, uid) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );
  const documentRef = doc(
    db,
    "submitted_applications_beta",
    `cohort${cohortN}`,
    "applications",
    aid,
  );
  await updateDoc(documentRef, { grade: 1 });

  createAwardeePlace(uid);
};

const createAwardeePlace = async (uid) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = {
    cohort: `cohort${cohortN}`,
    form: {},
  };

  const docRef = doc(db, "awardeesBank", uid);
  await setDoc(docRef, data);
};

const checkAdminAuth = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return false;

  const adminDoc = await getDoc(doc(db, "admin", user.uid));
  if (adminDoc.exists()) return true;

  const councilDoc = await getDoc(doc(db, "council", user.uid));
  return councilDoc.exists();
};

export const getAwardeeBank = async (uid) => {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized: Admin access required");
  }
  const data = [];
  const fetchBucket = collection(db, "awardeesBank");
  const querySnapshot = await getDocs(fetchBucket);

  querySnapshot.forEach((doc) => {
    data.push({ data: doc.data(), id: doc.id });
  });

  const filterUID = data.filter((res) => {
    return res.id === uid;
  });

  return filterUID;
};

export const getSubmittedAwardeesBank = async () => {
  if (!(await checkAdminAuth())) {
    throw new Error("Unauthorized: Admin access required");
  }
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = [];

  const fetchBucket = query(
    collection(db, "awardeesBank"),
    where("cohort", "==", `cohort${cohortN}`),
    where("status", "==", true),
  );

  const querySnapshot = await getDocs(fetchBucket);

  querySnapshot.forEach((doc) => {
    data.push(doc.data().form);
  });

  return data;
};

export const updateMaintenaceForm = async (uid, cohort, data) => {
  const dateUpdated = new Date();

  //update status in awardees using cohortNumber
  const docRef = doc(db, "awardees", cohort, "applicants", uid);

  const getTheDoc = await getDoc(docRef);

  if (getTheDoc.exists()) {
    await updateDoc(docRef, { status: true });
    await updateDoc(docRef, { dataUpdated: dateUpdated });

    //update in awardeesBank using uid

    const awardeesBankData = doc(db, "awardeesBank", uid);
    await updateDoc(awardeesBankData, { form: data });
    await updateDoc(awardeesBankData, { status: true });
    await updateDoc(awardeesBankData, { updated: dateUpdated });
  } else {
    alert("User Doesn't Exist");
  }

  return {
    status: "ok",
    message: "Form submitted successfully!",
  };
};

// GET Pending Applications

export const getPendingApps = async (track) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = [];

  if (track !== "all") {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("track", "==", track),
      where("avgGrade", "==", 0),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  } else {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("avgGrade", "==", 0),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  }

  return data;
};

// GET Pending Applications USer details

export const getfullUserApps = async (track) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = [];

  if (track !== "all") {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("track", "==", track),
      where("avgGrade", "==", 0),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  } else {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("avgGrade", "==", 0),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  }

  return data;
};

// GET Graded Applications

export const getGradedApps = async (track) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );

  const data = [];

  if (track !== "all") {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("track", "==", track),
      where("avgGrade", ">", 0),
      orderBy("avgGrade", "desc"),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  } else {
    const fetchBucket = query(
      collection(
        db,
        "submitted_applications_beta",
        `cohort${cohortN}`,
        "applications",
      ),
      where("avgGrade", ">", 0),
      orderBy("avgGrade", "desc"),
    );

    const querySnapshot = await getDocs(fetchBucket);

    querySnapshot.forEach((doc) => {
      data.push({ data: doc.data(), id: doc.id });
    });
  }

  return data;
};

// get current cohort number

export const getCurrentCohortNumber = async () => {
  const documentRef = doc(db, "preferences", "cohort");

  const documentRefSnap = await getDoc(documentRef);

  const grader = [];

  if (documentRefSnap.exists()) {
    grader.push(documentRefSnap.data());
  }

  return grader;
};

export const getAwardeeDetails = async (uid, cohort) => {
  const docRef = doc(db, "awardees", cohort, "applicants", uid);
  const getTheDoc = await getDoc(docRef);
  return getTheDoc.data();
};

// get current passmark

export const getPassmark = async () => {
  const documentRef = doc(db, "preferences", "passmark");
  const documentRefSnap = await getDoc(documentRef);
  return documentRefSnap.data();
};

// Get Council Member Listing

export const getCouncilMemberListing = async () => {
  const fetchApplications = collection(db, "council");
  const querySnapshot = await getDocs(fetchApplications);

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({ data: doc.data(), id: doc.id });
  });

  return data;
};

export const getCouncilGradeTrack = async (track) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );
  const fetchApplications = collection(
    db,
    "submitted_applications_beta",
    `cohort${cohortN}`,
    "applications",
  );
  const querySnapshot = await getDocs(fetchApplications);

  const allApplications = {
    stem: [],
    innovation: [],
    research: [],
    secsch: [],
  };

  querySnapshot.forEach((doc) => {
    //allApplications.push( Object.keys(doc.data().grades).length );

    switch (doc.data().track) {
      case "stem":
        allApplications.stem.push(doc.data());
        break;

      case "innovation":
        allApplications.innovation.push(doc.data());
        break;

      case "secsch":
        allApplications.secsch.push(doc.data());
        break;

      default:
        allApplications.research.push(doc.data());
        break;
    }
  });

  return fullDataNeeded(allApplications, track).then((res) => {
    return res;
  });
};

const fullDataNeeded = async (trackTotal, track) => {
  var calculate = {
    total: 0,
  };

  if (track.includes("stem")) {
    calculate.total += trackTotal.stem.length;
  }
  if (track.includes("innovation")) {
    calculate.total += trackTotal.innovation.length;
  }
  if (track.includes("secsch")) {
    calculate.total += trackTotal.secsch.length;
  }
  if (track.includes("research")) {
    calculate.total += trackTotal.research.length;
  }

  return calculate;
};

export const getCouncilApps = async (uid) => {
  const cohortN = await getCurrentCohortNumber().then(
    (cohortNum) => cohortNum[0].present,
  );
  const fetchApplications = collection(
    db,
    "submitted_applications_beta",
    `cohort${cohortN}`,
    "applications",
  );
  const querySnapshot = await getDocs(fetchApplications);

  const allApplications = {};
  const dataStage = [];

  querySnapshot.forEach((doc) => {
    if (doc.data().grades.hasOwnProperty(uid)) {
      dataStage.push(doc.data());
    }
  });

  allApplications[uid] = dataStage;

  return allApplications;
};

//////////////////////////////// Filter Track /////////////////////////////////////

export const filterDataByTrack = async (track, data) => {
  console.log(data);
};

//////////////////////////////// TEST AREAS /////////////////////////////////////

//export const testUser = async () => {

//     const fetchApplications = collection(db, "submittedApplications");
//     const querySnapshot = await getDocs(fetchApplications);

//     querySnapshot.forEach((doc) => {

//     //updateDocumentUser(doc.id, testUser2(doc.id));
//     //testUser2(doc.id, doc.data());

//         //testUser2(doc.data().uid);

//         //   if ( doc.id ===  `LASRIC_j7njo6aTElgYdPXCAqPc_LASRIC_j7njo6aTElgYdPXCAqPc_${doc.data().uid}`) {

//         //       //deleteFunction("submittedApplications", `LASRIC_j7njo6aTElgYdPXCAqPc_LASRIC_j7njo6aTElgYdPXCAqPc_${doc.data().uid}`)

//         //   } else {
//         //       console.log("cant find any doc")
//         //   }

//         // updateDocumentUser(`LASRIC_j7njo6aTElgYdPXCAqPc_${doc.id}`, doc.data())

//     });

// }

// export const testUser2 = async (uid) => {

//     const docRef = doc(db, "applications", `LASRIC_j7njo6aTElgYdPXCAqPc_${uid}`);
//     const docRef1 = doc(db, "users2", uid);
//     const dataMin = await getDoc(docRef1)

//     //console.log(dataMin.data())

//     if (dataMin.data() !== undefined) {

//         await setDoc(docRef, {

//             uid : `LASRIC_j7njo6aTElgYdPXCAqPc_${uid}`,
//             data : dataMin.data().form.data,
//             grade : 0,
//             gradedBy : [],
//             status : "pending",
//             submitted : true,
//             track : "secsch"

//         })

//     }

//     //updateDocumentUser(`LASRIC_j7njo6aTElgYdPXCAqPc_${uid}`, data)

// }

// export const updateDocumentUser = async (uid, data) => {

//     const documentRef = doc(db, "submittedApplications", uid);

//     await updateDoc(documentRef, { "dateSubmitted" : new Date (data.dateSubmitted) });

// }
