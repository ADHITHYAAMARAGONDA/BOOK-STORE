import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* 🔐 Protected Routes */}
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
            <CreateBooks />
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

      {/* 👤 Public Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div className="text-center mt-10 text-red-500">
            404: Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default App;
