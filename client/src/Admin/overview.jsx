import React, { useState, useEffect } from "react";
import PathDun from "../assets/svg/pathGroove.svg";
import Users from "../assets/svg/manAdmin.svg";
import Apply from "../assets/svg/smartphone.svg";
import Submitted from "../assets/svg/submit.svg";

import pending from "../assets/svg/pending.svg";
import graded from "../assets/svg/grade.svg";
import brief from "../assets/svg/briefcase (2).svg";
import Win from "../assets/svg/winner.svg";
import Puzzle from "../assets/svg/delete.svg";
import Chapter from "../assets/svg/sections.svg";

import SethAnimation from "../components/lottie/seth-animation";

import AdminShow from "./adminShow";
import AdminTable from "./adminTables";

import { getOverviewStats } from "../api/firebase/admin/admin_applications";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import OverAdmins from "./overviewTables";
import {
  Bitbucket,
  CheckSquare,
  CheckSquareSolid,
  CubeDots,
  DesignNibSolid,
  FireFlame,
  GoogleDocs,
  Medal,
  User,
  UserBadgeCheck,
} from "iconoir-react";

const Overview = () => {
  const formatToThousands = (num) => {
    return num.toLocaleString();
  };

  const initialData = {
    users: 0,
    applications: 0,
    submitted: 0,
    pending: 0,
    graded: 0,
    unsubmitted: 0,
    councilGraded: 0,
    interviewBucket: 0,
    currentCohort: 0,
  };

  const [counts, setCounts] = useState(initialData);
  const [loader, setLoader] = useState(true);

  const setAllDataAPI = async () => {
    try {
      const stats = await getOverviewStats();
      return stats;
    } catch (error) {
      console.error("Error fetching overview data:", error);
      return initialData;
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAllDataAPI().then((e) => {
          setCounts(e);
          setLoader(false);
        });
      } else {
        setLoader(false);
      }
    });

    return () => unsubscribe();
  }, []);

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

  return (
    <div className="overviewAdmin">
      {loader ? (
        <div className="loadingData">
          <SethAnimation
            jsonSrc={
              "https://assets4.lottiefiles.com/packages/lf20_jusuh7t5.json"
            }
            lottieStyle={{ width: "400px", height: "400px" }}
            speed={"1"}
          />
        </div>
      ) : null}
      <div className="dashboard_cards">
        <div className="longCards">
          <div className="card_stat">
            <div className="iconFit">
              <img src={Users} alt="total Users" />
            </div>
            <div className="detailedStat">
              <div className="title">
                <User fontSize={11} /> Users
              </div>
              <div className="stat_number">
                {formatToThousands(counts.users)}
              </div>
            </div>
          </div>

          <div className="card_stat">
            <div className="iconFit">
              <img src={Apply} alt="total Applications" />
            </div>
            <div className="detailedStat">
              <div className="title">
                <GoogleDocs fontSize={11} /> Applications
              </div>
              <div className="stat_number">
                {formatToThousands(counts.applications)}
              </div>
            </div>
          </div>

          <div className="card_stat">
            <div className="iconFit">
              <img src={Submitted} alt="total Submitted" />
            </div>
            <div className="detailedStat">
              <div className="title">
                <CheckSquare fontSize={11} /> Submitted
              </div>
              <div className="stat_number">
                {formatToThousands(counts.submitted)}
              </div>
            </div>
          </div>

          <div className="card_stat">
            <div className="detailedStat">
              <div className="title">
                <FireFlame fontSize={11} /> Pending
              </div>
              <div className="stat_number">
                {formatToThousands(counts.pending)}
              </div>
            </div>
          </div>

          <div className="card_stat">
            <div className="detailedStat">
              <div className="title">
                <DesignNibSolid fontSize={11} /> Graded
              </div>
              <div className="stat_number">
                {formatToThousands(counts.graded)}
              </div>
            </div>
          </div>

          <div className="card_stat">
            <div className="detailedStat">
              <div className="title">
                <UserBadgeCheck fontSize={11} /> Council Graded
              </div>
              <div className="stat_number">
                {formatToThousands(counts.councilGraded)}
              </div>
            </div>
          </div>

          <div className="card_stat">
            <div className="detailedStat">
              <div className="title">
                <Bitbucket fontSize={11} /> Interview Bucket
              </div>
              <div className="stat_number">
                {formatToThousands(counts.interviewBucket)}
              </div>
            </div>
          </div>

          <div className="card_stat">
            <div className="detailedStat">
              <div className="title">
                <Medal fontSize={11} /> Awardees
              </div>
              <div className="stat_number">{formatToThousands(0)}</div>
            </div>
          </div>

          <div className="card_stat">
            <div className="detailedStat">
              <div className="title">
                <CubeDots fontSize={11} /> Current Cohort
              </div>
              <div className="stat_number">
                {formatToThousands(counts.currentCohort)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <OverAdmins check="submitted" />
    </div>
  );
};

export default Overview;
