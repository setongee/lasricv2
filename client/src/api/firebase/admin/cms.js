import { type } from "@testing-library/user-event/dist/type";
import { doc, updateDoc, getDocs, collection, deleteDoc, addDoc, where, query, orderBy, getDoc, setDoc, QuerySnapshot } from "firebase/firestore";
import { db } from "../config";


export const setLandingDetails = async (data, cms_area) => {

    const docRef = doc( db, "cms", cms_area );
    await setDoc(docRef, data);

}

export const addCallupsDetails = async ( data, cms_area, cohort ) => {

    await addDoc(collection(db, "cms", cms_area, cohort), data)

}

export const addBeneficiaryDetails = async ( data, cohort ) => {

    await addDoc(collection(db, "cms", "beneficiaries", cohort), data)

}

export const editBeneficiaryDetails = async (cohort, uid) => {

    const docRef = await doc(db, "cms", "beneficiaries", cohort, uid)
    const documenter = await getDoc(docRef)

   return documenter.data()

}

export const updateBeneficiary = async (cohort, uid, data) => {

    const docRef = await doc(db, "cms", "beneficiaries", cohort, uid);
    await setDoc(docRef, data);

}

export const deleteBeneficiaryCMS = async (cohort, uid) => {

    const docRef = await doc(db, "cms", "beneficiaries", cohort, uid)
    await deleteDoc(docRef);

}

export const addAlbum = async ( data ) => {

    await addDoc(collection(db, "cms", "gallery", "albums"), data)

}

export const deleteAlbum = async (uid) => {

    const docRef = await doc(db, "cms", "gallery", "albums", uid)
    await deleteDoc(docRef);

}

export const editAlbumDetails = async (uid) => {

    const docRef = await doc(db, "cms", "gallery", "albums", uid)
    const documenter = await getDoc(docRef)

   return documenter.data()

}

export const updateAlbumDetails = async (uid, data) => {

    const docRef = await doc(db, "cms", "gallery", "albums", uid)
    await setDoc(docRef, data);

}

export const editCallup = async (cohort, uid) => {

    const docRef = await doc(db, "cms", "callups", cohort, uid)
    const documenter = await getDoc(docRef)

   return documenter.data()

}

export const updateCallup = async (cohort, uid, data) => {

    const docRef = await doc(db, "cms", "callups", cohort, uid)
    await setDoc(docRef, data);

}

export const deleteDocumentCMS = async (cohort, uid) => {

    const docRef = await doc(db, "cms", "callups", cohort, uid)
    await deleteDoc(docRef);

}

export const getCMSData = async (cms_area) => {

    const docRef = doc(db, "cms", cms_area)
    const documenter = await getDoc(docRef)

    return documenter.data()

}

export const getCMSCallupData = async (cms_area, cohort) => {

    const docRef = await collection(db, "cms", cms_area, cohort)
    const documenter = await getDocs(docRef)

    const callupsData = [];

    documenter.forEach( callup => {
        callupsData.push({
            data : callup.data(),
            uid : callup.id
        });
    })

    return callupsData;

}

export const getCMSCallupDataBeneficiary = async (cms_area, cohort, track) => {


    const callupsData = [];
    

    if (track !== "all") {

        const docRef = await query(collection(db, "cms", cms_area, cohort), where( "track", "==" , track ));

        const documenter = await getDocs(docRef)

        documenter.forEach( callup => {
            callupsData.push({
                data : callup.data(),
                uid : callup.id
            });
        })

    } else {

        const docRef = await collection(db, "cms", cms_area, cohort);

        const documenter = await getDocs(docRef)

        documenter.forEach( callup => {
            callupsData.push({
                data : callup.data(),
                uid : callup.id
            });
        })

    }

   

    return callupsData;

}

export const getPortfolio = async (cohort) => {


    const portfolio = [];

    for (var i = 1; i < Number(cohort); i++) {
        
        const docRef = await collection(db, "cms", "beneficiaries", `cohort${i}`);

        const documenter = await getDocs(docRef)

        documenter.forEach( data => {
            portfolio.push({
                data : data.data(),
                uid : data.id
            });
        })

    }


    return portfolio;

}
