import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthScreen from "./screens/authScreen/AuthScreen";
import UploadScreen from "./screens/uploadScreen/UploadScreen";

function App() {
  const isAuthenticated = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/upload" /> : <AuthScreen />}
        />
        <Route path="/upload" element={<UploadScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
