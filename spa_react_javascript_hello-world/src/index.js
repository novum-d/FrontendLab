import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.css";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { AdminPage } from "./pages/admin-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { ProtectedPage } from "./pages/protected-page";
import { PublicPage } from "./pages/public-page";
import { Auth0ProviderWithHistory } from "./auth0-provider-with-history";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth0ProviderWithHistory><Outlet /></Auth0ProviderWithHistory>,
    children: [
      { element: <Navigate to={"/home"} />, index: true, },
      { path: "/home", element: <HomePage />, },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/public", element: <PublicPage /> },
      { path: "/protected", element: <ProtectedPage /> },
      { path: "/admin", element: <AdminPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);


