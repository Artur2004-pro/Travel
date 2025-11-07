import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./pages/general/layout";
import AdminLayout from "./pages/admin/admin-layout";

// 🌍 General pages
import { Home } from "./pages/general/home";
import { Login } from "./pages/general/login";
import Signup from "./pages/general/signup";

// 🏛 Admin pages
import { BeAdmin } from "./pages/admin/be-admin";
import { Admin } from "./pages/admin/admin";
import { AddCountry } from "./pages/admin/add-country";
import Country from "./pages/admin/country";
import { EditCountry } from "./pages/admin/edit-country";
import { City } from "./pages/admin/city";
import { AddCity } from "./pages/admin/add-city";
import { EditCity } from "./pages/admin/edit-city";
import { Users } from "./pages/admin/users";
import { EditUser } from "./pages/admin/edit-user";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      // 🌐 Public site
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "be-admin", element: <BeAdmin /> },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { path: "", element: <Admin /> },

          { path: "country", element: <Country /> },
          { path: "add-country", element: <AddCountry /> },
          { path: "country/:id", element: <EditCountry /> },

          { path: "city", element: <City /> },
          { path: "city/add", element: <AddCity /> },
          { path: "city/edit/:id", element: <EditCity /> },

          { path: "users", element: <Users /> },
          { path: "users/:id", element: <EditUser /> },

          { path: "*", element: <Navigate to="/admin" replace /> },
        ],
      },
    ],
  },
]);
