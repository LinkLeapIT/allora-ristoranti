import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "@/firebase/server"; 
import admin from "firebase-admin"; // Ensure correct FieldValue usage
import "server-only";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> } // Expect params as a Promise
) {
  const resolvedParams = await params; // Await the params to avoid Promise type errors
  const { action } = resolvedParams; // Destructure safely
  const { productId } = await request.json();

  const token = request.cookies.get("firebaseAuthToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const verifiedToken = await auth.verifyIdToken(token);
    if (!verifiedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userDoc = firestore.collection("favourites").doc(verifiedToken.uid);

    if (action === "add") {
      await userDoc.set({ [productId]: true }, { merge: true });
    } else if (action === "remove") {
      await userDoc.update({ [productId]: admin.firestore.FieldValue.delete() });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating favourites:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
