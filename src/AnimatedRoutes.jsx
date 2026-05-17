import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Welcome from "./components/welcome/Welcome";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<Welcome />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedRoutes;
