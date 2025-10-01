import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetail from "./pages/MovieDetail";
import SeatLayout from "./pages/SeatLayout";
import MyBooking from "./pages/MyBooking";
import Favorite from "./pages/Favorite";
import { Toaster } from "react-hot-toast";
function App() {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");
  return (
    <>
      {/* Thông báo */}
      <Toaster />
      {/* Check Admin use Navbar */}
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
      {/* Check Admin use Navbar */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
