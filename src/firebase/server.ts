import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// Check if the service account key is available
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.');
}

// Parse the service account key from the environment variable
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} catch (e) {
  try {
    serviceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8'));
  } catch (e) {
    throw new Error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid JSON or base64 encoded JSON.');
  }
}

// Initialize Firebase Admin SDK if it hasn't been already
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();
const auth = admin.auth();

const setAdminClaim = async (uid: string) => {
  await auth.setCustomUserClaims(uid, { admin: true });
  console.log(`Custom claim set for UID: ${uid}`);
};



export { admin, firestore, auth, setAdminClaim };
