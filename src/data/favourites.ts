//data/favourites
import { auth, firestore } from "@/firebase/server";
import { cookies } from "next/headers";

export const getUserFavourites = async () => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("firebaseAuthToken")?.value;

    if (!token) {
      return {};
    }

    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return {};
    }

    const favouritesSnapshot = await firestore
      .collection("favourites")
      .doc(verifiedToken.uid)
      .get();

    return favouritesSnapshot.data() || {};
  } catch (error) {
    console.error("Error fetching favourites from Firestore:", error);
    return {};
  }
};
//