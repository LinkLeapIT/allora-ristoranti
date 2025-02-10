"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Define a TypeScript interface for a Shift.
interface Shift {
  shiftId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  reserved: number;
  available: number;
}

// A helper function that returns the default shift for a given date.
const defaultShift = (date: string): Shift => ({
  shiftId: `${date}-default`,
  date,
  startTime: "17:00",
  endTime: "22:00",
  capacity: 20,
  reserved: 0,
  available: 20,
});

// Utility function to chunk an array into subarrays of given size.
const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function AvailableShiftsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const guests = searchParams.get("guests");
  const expectedTime = searchParams.get("expectedTime");

  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    // Simulate a delay (500ms) for "fetching" data.
    setTimeout(() => {
      let availableShifts: Shift[] = [];
      if (date) {
        // If a specific date is provided, show the default shift for that day.
        availableShifts = [defaultShift(date)];
      } else {
        // Otherwise, generate shifts for the next 28 days.
        const days = 28;
        const today = new Date();
        for (let i = 0; i < days; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() + i);
          const formattedDate = d.toISOString().split("T")[0];
          availableShifts.push(defaultShift(formattedDate));
        }
      }
      setShifts(availableShifts);
      setLoading(false);
    }, 500);
  }, [date]);

  const handleShiftSelect = (shiftId: string, shiftDate: string) => {
    // Build query parameters for the reservation details page.
    const query = new URLSearchParams({
      shiftId,
      date: shiftDate,
      guests: guests || "1",
      expectedTime: expectedTime || "",
    });
    router.push(`/booking/reservation-details?${query.toString()}`);
  };

  if (loading) {
    return <div className="text-center">Loading available shifts...</div>;
  }

  if (shifts.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>
          No available shifts. Please choose another date or call the restaurant.
        </p>
      </div>
    );
  }

  // If no specific date is provided, group shifts into weeks (7 days per week).
  const weeks = date ? [shifts] : chunkArray(shifts, 7);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-2xl font-bold mb-6 bg-gradient-to-r from-darkText via-lightText to-darkText bg-clip-text text-transparent "
      >
        {date
          ? `Available Shift for ${date}`
          : "Available Shifts for the Next 4 Weeks"}
      </motion.h2>
      {expectedTime && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-4 text-gray-600"
        >
          Expected Arrival Time: {expectedTime}
        </motion.p>
      )}
      {/* Render each week row */}
      <div className="space-y-8">
        {weeks.map((week, index) => (
          <div key={index} className="overflow-x-auto scrollbar-hide relative">
            <div className="flex gap-4">
              <h1 className="flex gap-2 sticky left-0 top-0 z-50">week <span>{index + 1}</span></h1>
              {week.map((shift) => {
                // Compute day name and formatted date from the shift.date.
                const shiftDateObj = new Date(shift.date);
                const dayName = shiftDateObj.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                const formattedDate = shiftDateObj.toLocaleDateString("en-US");
                return (
                  <motion.div
                    key={shift.shiftId}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="min-w-[200px] flex-shrink-0 border border-lightText rounded-xl p-4 bg-darkBg cursor-pointer"
                    onClick={() => handleShiftSelect(shift.shiftId, shift.date)}
                  >
                    <h3 className="font-semibold mb-2">
                      {shift.startTime} - {shift.endTime}
                    </h3>
                    <p>
                      <strong>Day:</strong> {dayName}
                    </p>
                    <p>
                      <strong>Date:</strong> {formattedDate}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {shift.capacity}
                    </p>
                    <p>
                      <strong>Reserved:</strong> {shift.reserved}
                    </p>
                    <p>
                      <strong>Available:</strong> {shift.available}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
