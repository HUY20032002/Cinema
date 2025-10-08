import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, dummyDateTimeData, dummyShowsData } from "../assets/assets";
import Loading from "../components/Loading";
import isoTimeFormat from "../lib/isoTimeFormat";
import { ClockIcon } from "lucide-react";
import BlurCircle from "../components/BlurCircle";
import toast from "react-hot-toast";

function SeatLayout() {
  const groupRows = [["A"], ["B", "C"], ["D", "E"], ["F", "G"], ["H", "J"]];
  const { id, date } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  const getShow = async () => {
    const show = dummyShowsData.find((show) => show._id === id);
    if (show) setShow({ movie: show, dateTime: dummyDateTimeData });
  };

  useEffect(() => {
    getShow();
  }, [id, date]);

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select a time slot");
    if (selectedSeats.length >= 5 && !selectedSeats.includes(seatId))
      return toast("You can only select up to 5 seats");
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const renderSeats = (row, count = 10) => {
    // riêng hàng A → chia đôi
    if (row === "A") {
      const left = Array.from({ length: 5 }, (_, i) => `${row}${i + 1}`);
      const right = Array.from({ length: 5 }, (_, i) => `${row}${i + 6}`);
      return (
        <div className="flex justify-center items-center gap-10 mt-2" key={row}>
          {/* Cụm trái */}
          <div className="flex gap-2">
            {left.map((seatId) => (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
                  selectedSeats.includes(seatId) ? "bg-primary text-white" : ""
                }`}
              >
                {seatId}
              </button>
            ))}
          </div>

          {/* Khoảng trống giữa hai cụm */}
          <div className="w-16"></div>

          {/* Cụm phải */}
          <div className="flex gap-2">
            {right.map((seatId) => (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
                  selectedSeats.includes(seatId) ? "bg-primary text-white" : ""
                }`}
              >
                {seatId}
              </button>
            ))}
          </div>
        </div>
      );
    }

    // các hàng khác giữ nguyên
    return (
      <div className="flex gap-2 mt-2" key={row}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => {
            const seatId = `${row}${index + 1}`;
            return (
              <button
                key={seatId}
                onClick={() => handleSeatClick(seatId)}
                className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${
                  selectedSeats.includes(seatId) ? "bg-primary text-white" : ""
                }`}
              >
                {seatId}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  if (!show) return <Loading />;

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50 gap-6">
      {/* Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6 mb-4">Available Timings</p>

        {show.dateTime[date]?.map((item) => (
          <div
            key={item.time}
            onClick={() => setSelectedTime(item)}
            className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${
              selectedTime?.time === item.time
                ? "bg-primary text-white"
                : "hover:bg-primary/20"
            }`}
          >
            <ClockIcon className="w-4 h-4" />
            <p className="text-sm">{isoTimeFormat(item.time)}</p>
          </div>
        ))}
      </div>

      {/* Seat Layout content */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
        <BlurCircle top="-100" left="-100" />
        <BlurCircle bottom="0" right="0" />
        <h1 className="text-2xl font-semibold mb-4">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" />
        <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

        <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
          {groupRows[0].map((row) => renderSeats(row))}{" "}
          <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, index) => (
              <div key={index} className="">
                {group.map((row) => renderSeats(row))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatLayout;
