import { setDoc, doc, serverTimestamp, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase.config";

const Firestore = {
  readDocs: (collection_name) => {
    const ref = collection(db, collection_name);
    return new Promise(async (resolve, reject) => {
      try {
        const snapshots = await getDocs(ref);
        const docsArray = [];
        snapshots.forEach((docSnap) => {
          docsArray.push({ ...docSnap.data(), id: docSnap.id });
        });
        resolve(docsArray);
      } catch (e) {
        console.error("Error reading documents:", e);
        reject(e);
      }
    });
  },

  writeDoc: (inputs, collection_name) => {
    return new Promise(async (resolve, reject) => {
      // You can generate a random ID or rely on Firestore's auto-generated ID.
      // We'll do a random integer for demonstration:
      const randomIndex = Math.floor(Math.random() * 1_000_000_000).toString();
      try {
        const docRef = doc(db, collection_name, randomIndex);
        await setDoc(docRef, {
          ...inputs,
          createdAt: serverTimestamp(),
        });
        resolve(`New doc successfully inserted with id ${randomIndex}`);
      } catch (e) {
        console.error("Error writing document:", e);
        reject(e);
      }
    });
  },
};

export default Firestore;
