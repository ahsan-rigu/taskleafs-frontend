import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </main>
    </>
  );
}

export default App;
