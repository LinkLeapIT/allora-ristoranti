"use server";

import { auth } from "@/firebase/client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { registerUserSchema } from "@/validation/registerUser";

export const registerUser = async (data: {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}) => {
  const validation = registerUserSchema.safeParse(data);

  if (!validation.success) {
    return {
      error: true,
      message: validation.error.issues[0]?.message ?? "An error occurred",
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await updateProfile(userCredential.user, {
      displayName: data.name,
    });

    return { success: true, message: "User registered successfully!" };
  } catch (e: any) {
    console.error("Firebase Registration Error:", e.message);
    return {
      error: true,
      message: e.message ?? "Could not register user",
    };
  }
};
