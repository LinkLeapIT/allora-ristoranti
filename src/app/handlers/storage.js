import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/client";

const Storage = {
  uploadFile: (media) => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileName = media.title.trim(); // remove trailing spaces if any
        const mediaRef = ref(storage, `images/${fileName}`);
        
        const snapshot = await uploadBytes(mediaRef, media.file);
        
        // Now get the actual public URL
        const publicURL = await getDownloadURL(snapshot.ref);

        // Return both the internal path and the full URL
        resolve({
          path: snapshot.metadata.fullPath, // e.g. "images/Shawarma"
          url: publicURL,                    // e.g. "https://firebasestorage.googleapis.com/v0/b/YOUR_PROJECT..."
          name: fileName,
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },

  downloadFile: (media) => {
    return new Promise(async (resolve, reject) => {
      try {
        const mediaRef = ref(storage, media.path);
        const fileURL = await getDownloadURL(mediaRef);
        resolve(fileURL);
      } catch(e) {
        console.error(e);
        reject(e);
      }
    });
  },
};

export default Storage;
