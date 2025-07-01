// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/todos"
        element={
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
