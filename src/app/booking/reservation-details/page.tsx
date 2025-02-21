"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getAuth, User } from "firebase/auth";
import {auth} from "../../../firebase/client";
import toast, { Toaster } from "react-hot-toast";

export default function ReservationDetailsPage() {
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber");
  const shiftId = searchParams.get("shiftId");
  const date = searchParams.get("date");
  const guests = searchParams.get("guests");
  const expectedTime = searchParams.get("expectedTime");

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return (
    <div className="max-w-lg mx-auto p-8 text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6"
      >
        Reservation Details
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 text-lg"
      >
        <p>
          <strong>Name:</strong> {user?.displayName || "Guest"}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {user?.phoneNumber || phoneNumber || "Not provided"}
        </p>
        <p>
          <strong>Shift ID:</strong> {shiftId}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Number of Guests:</strong> {guests}
        </p>
        <p>
          <strong>Expected Arrival Time:</strong> {expectedTime}
        </p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={() => toast.success("Reservation Confirmed!")}
        className="mt-8 px-6 py-3 text-lg bg-lightText text-white font-bold rounded-xl"
      >
        Confirm Reservation
      </motion.button>
      <Toaster />
    </div>
  );
}
