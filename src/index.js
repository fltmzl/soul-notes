import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/richtext.css";
import "./styles/tiptap.scss";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import NoteDetails from "./pages/NoteDetails";
import LoginPage from "./pages/LoginPage";
import AuthRoutes from "./components/Middleware/AuthRoutes";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/Middleware/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<ProtectedRoutes />}>
        <Route index element={<HomePage />} />
        <Route path="archive" element={<ArchivePage />} />
        <Route path="tags">
          <Route path=":tagID" element={<p>Tag Note detail</p>} />
        </Route>
        <Route path="categories" element={<p>Categories</p>} />
        <Route path="notes/:id" element={<NoteDetails />} />
      </Route>
      <Route path="auth" element={<AuthRoutes />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<p>Register</p>} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
