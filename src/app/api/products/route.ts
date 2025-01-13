import { NextRequest, NextResponse } from "next/server";
import Firestore from "@/app/handlers/firestore";

export async function GET(req: NextRequest) {
  try {
    const items = await Firestore.readDocs("products");
    return NextResponse.json({
      message: "Products fetched successfully",
      success: true,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Product fetch failed" },
      { status: 500 }
    );
  }
}
