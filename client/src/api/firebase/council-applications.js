//check into db

import {
  doc,
  updateDoc,
  getDocs,
  collection,
  arrayUnion,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { db } from "./config";
import { data } from "./new-data";
import { getCurrentCohortNumber } from "./admin/admin_applications";

export const getApplicationGrades = async (appid) => {
  const currentCohort = await getCurrentCohortNumber();
  const documentRef = doc(
    db,
    "submitted_applications_beta",
    `cohort${currentCohort[0]?.present}`,
    "applications",
    appid
  );
  const documentRefSnap = await getDoc(documentRef);

  //await updateDoc(documentRef, { "grades" : {} });

  const grader = [];

  if (documentRefSnap.exists()) {
    grader.push(documentRefSnap.data());
  }

  return { ...grader[0] };
};

export const getAllSubmittedApplications = async (uid) => {
  const getCohortNumber = await getCurrentCohortNumber();
  const cohortNumber = `cohort${getCohortNumber[0]?.present}`;
  const querySnapshot = await getDocs(
    query(
      collection(
        db,
        "submitted_applications_beta",
        cohortNumber,
        "applications"
      ),
      orderBy("dateSubmitted", "desc")
    )
  );

  const counRef = doc(db, "council", uid);
  const res = await getDoc(counRef);
  const tracks = res.data().track;

  const result = [];

  querySnapshot.forEach((doc) => {
    if (tracks.includes(doc.data().track)) {
      result.push({ ...doc.data(), appid: doc.id });
    }
  });

  return result;
};

export const updateGrade = async (appid, score, uid, gradings) => {
  const currentCohort = await getCurrentCohortNumber();
  const documentRef = doc(
    db,
    "submitted_applications_beta",
    `cohort${currentCohort[0]?.present}`,
    "applications",
    appid
  );

  await updateDoc(documentRef, {
    [`grades.${uid}`]: {
      councilID: uid,
      gradings: gradings,
      grade: score,
      applicationID: appid,
    },
  }).then(() => updateAvgGrade(appid));
};

const updateAvgGrade = async (appid) => {
  const currentCohort = await getCurrentCohortNumber();
  const documentRef = doc(
    db,
    "submitted_applications_beta",
    `cohort${currentCohort[0]?.present}`,
    "applications",
    appid
  );
  const querySnap = await getDoc(documentRef);
  const councilNum = Object.keys(querySnap.data().grades).length;

  if (councilNum > 1) {
    const newGrade = querySnap.data().grades;
    const total = Object.values(newGrade).reduce(
      (t, { grade }) => t + grade,
      0
    );
    const avgGrade = total / councilNum;

    updateDoc(documentRef, { avgGrade: avgGrade });
    updateDoc(documentRef, {
      grade_export: `${Math.round(avgGrade * 10) / 10}%`,
    });
  }
};
