// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ImportBooks from "./pages/ImportBooks"; // ✅ Import added

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/create"
          element={
            <ProtectedRoute>
              <CreateBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/details/:id"
          element={
            <ProtectedRoute>
              <ShowBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/edit/:id"
          element={
            <ProtectedRoute>
              <EditBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/delete/:id"
          element={
            <ProtectedRoute>
              <DeleteBook />
            </ProtectedRoute>
          }
        />

        {/* ✅ New Import Books Route */}
        <Route
          path="/books/import"
          element={
            <ProtectedRoute>
              <ImportBooks />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown paths */}
        <Route
          path="*"
          element={<Navigate to={token ? "/" : "/signin"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
