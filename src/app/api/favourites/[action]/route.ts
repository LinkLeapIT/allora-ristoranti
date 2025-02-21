// app/api/favourites/[action]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "@/firebase/server"; 
import { FieldValue } from "firebase-admin/firestore";
import "server-only";

export async function POST(
  request: NextRequest,
  { params }: { params: { action: string } }
) {
  const { action } = params;
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
      await userDoc.update({ [productId]: FieldValue.delete() });
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
