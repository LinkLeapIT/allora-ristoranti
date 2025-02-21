"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import {auth} from "../../firebase/client";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function BookingHomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [reservationDate, setReservationDate] = useState<string>("");
  const [expectedArrivalTime, setExpectedArrivalTime] = useState<string>("");
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Optionally, redirect to the login page if not logged in.
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle the form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!expectedArrivalTime) {
      toast.error("Please choose your expected arrival time.");
      return;
    }

    // Build query parameters; if no date is chosen, the available-shifts page will show all days.
    const query = new URLSearchParams({
      guests: numberOfGuests.toString(),
      expectedTime: expectedArrivalTime,
    });
    if (reservationDate) {
      query.set("date", reservationDate);
    }

    router.push(`/booking/available-shifts?${query.toString()}`);
  };

  return (
    <div className="max-w-md mx-auto p-8 text-center text-darkText">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl bg-gradient-to-r from-darkText via-lightText to-darkText bg-clip-text text-transparent font-bold mb-6"
      >
        Make a Reservation
      </motion.h2>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
        {/* Email */}
        <div className="text-left">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email
          </label>
          <motion.p className="w-full p-3 border-2 border-lightText rounded-xl outline-none bg-lightBg">
            {user?.email || ""}
          </motion.p>
        </div>
        {/* Name */}
        <div className="text-left">
          <label htmlFor="name" className="block mb-2 font-bold">
            Name
          </label>
          <motion.input
            id="name"
            type="text"
            defaultValue={user?.displayName || ""}
            whileFocus={{ scale: 1.05, borderColor: "#3a3a3a" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full p-3 border-2 border-lightText rounded-xl outline-none bg-lightBg"
          />
        </div>
        {/* Phone Number */}
        <div className="text-left">
          <label htmlFor="phoneNumber" className="block mb-2 font-bold">
            Phone Number
          </label>
          <motion.input
            id="phoneNumber"
            type="number"
            min="9"
            onChange={(e) => setPhoneNumber(e.target.value)}
            whileFocus={{ scale: 1.05, borderColor: "#3a3a3a" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full p-3 border-2 border-lightText rounded-xl outline-none bg-lightBg"
          />
        </div>
        {/* Number of Guests */}
        <div className="text-left">
          <label htmlFor="numberOfGuests" className="block mb-2 font-bold">
            Number of Guests:
          </label>
          <motion.input
            id="numberOfGuests"
            type="number"
            min="1"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(parseInt(e.target.value, 10))}
            whileFocus={{ scale: 1.05, borderColor: "#3a3a3a" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full p-3 border-2 border-lightText rounded-xl outline-none bg-lightBg"
          />
        </div>
        {/* Expected Arrival Time */}
        <div className="text-left">
          <label htmlFor="expectedArrivalTime" className="block mb-2 font-bold">
            Expected Arrival Time:
          </label>
          <motion.input
            id="expectedArrivalTime"
            type="time"
            value={expectedArrivalTime}
            onChange={(e) => setExpectedArrivalTime(e.target.value)}
            whileFocus={{ scale: 1.05, borderColor: "#3a3a3a" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full p-3 border-2 border-lightText rounded-xl outline-none bg-lightBg"
          />
        </div>
        {/* Reservation Date */}
        <div className="text-left">
          <label htmlFor="reservationDate" className="block mb-2 font-bold">
            Reservation Date (optional):
          </label>
          <motion.input
            id="reservationDate"
            type="date"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            whileFocus={{ scale: 1.05, borderColor: "#3a3a3a" }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-full p-3 border-2 border-lightText rounded-xl outline-none bg-lightBg"
          />
          <small className="block mt-2 text-gray-500">
            Leave empty to view all available days.
          </small>
        </div>
        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="px-6 py-3 text-lg bg-lightText text-darkBg font-bold rounded-xl cursor-pointer"
        >
          Check Availability
        </motion.button>
      </form>
      <Toaster />
    </div>
  );
}
