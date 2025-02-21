// app/api/favourites/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "@/firebase/server"; // Server-side only imports
import "server-only";

// Handle GET request to fetch all favourites
export async function GET(request: NextRequest) {
  const token = request.cookies.get("firebaseAuthToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favouritesSnapshot = await firestore
      .collection("favourites")
      .doc(verifiedToken.uid)
      .get();

    const favouritesData = favouritesSnapshot.data() || {};
    return NextResponse.json(favouritesData);
  } catch (error) {
    console.error("Error fetching user favourites:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
