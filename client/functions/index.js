const {beforeUserCreated} = require("firebase-functions/v2/identity");
const {onCall, HttpsError} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

exports.beforeCreate = beforeUserCreated(async (event) => {
  const email = event.data.email || "";
  const ADMIN_DOMAINS = ["@lasric.lagosstate.gov.ng"];
  const isPrivilegedEmail = ADMIN_DOMAINS.some((domain) =>
    email.endsWith(domain),
  );
  if (isPrivilegedEmail) {
    throw new Error(
        "This email must be provisioned by an administrator. " +
        "Please contact the LASRIC admin team.",
    );
  }
  return;
});

// New function to create council members without affecting admin session
exports.createCouncilMember = onCall(async (request) => {
  // Verify the caller is an admin
  const callerUid = request.auth?.uid;
  if (!callerUid) {
    throw new HttpsError("unauthenticated", "Must be logged in.");
  }

  const adminDoc = await admin
      .firestore()
      .collection("admin")
      .doc(callerUid)
      .get();

  if (!adminDoc.exists) {
    throw new HttpsError("permission-denied", "Must be an admin.");
  }

  const {
    email,
    password,
    lastname,
    firstname,
    phone,
    linkedinProfile,
    ...rest
  } = request.data;

  try {
    // Create user without affecting current auth session
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstname} ${lastname}`,
    });

    // Create users document
    await admin
        .firestore()
        .collection("users")
        .doc(userRecord.uid)
        .set({
          lastname,
          firstname,
          email,
          phone,
          uid: userRecord.uid,
          type: "council",
          applications: [],
          application_pathway: {},
          verified: false,
          photo: "",
          linkedinProfile: linkedinProfile || "",
          team: [],
          createdAt: new Date(),
        });

    // Create council document
    await admin
        .firestore()
        .collection("council")
        .doc(userRecord.uid)
        .set({
          ...rest,
          lastname,
          firstname,
          email,
          phone,
          uid: userRecord.uid,
          linkedinProfile: linkedinProfile || "",
        });

    return {success: true, uid: userRecord.uid};
  } catch (error) {
    throw new HttpsError("internal", error.message);
  }
});
