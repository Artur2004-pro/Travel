import { createBrowserRouter } from "react-router-dom";
import { BeAdmin } from "./pages/admin/be-admin";
import { Signup } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { Home } from "./pages/general/home";
import { Admin } from "./pages/admin/admin";
import { AddCountry } from "./pages/admin/add-country";
import { Country } from "./pages/admin/country";
import { City } from "./pages/admin/city";
import { EditCountry } from "./pages/admin/edit-country";
import { AddCity } from "./pages/admin/add-city";
import { UpdateCity } from "./pages/admin/edit-city";

export const router = createBrowserRouter([
  { path: "be-admin", element: <BeAdmin /> },
  { path: "signup", element: <Signup /> },
  { path: "login", element: <Login /> },
  { path: "home", element: <Home /> },
  {
    path: "admin",
    element: <Admin />,
    children: [
      { path: "country", element: <Country /> },
      { path: "add-country", element: <AddCountry /> },
      { path: "country/:id", element: <EditCountry /> },

      { path: "city/:countryId", element: <City /> },
      {path: "city/:countryId/:cityId", element: <UpdateCity/>},
      { path: "add-city/:countryId", element: <AddCity /> },
      { path: "update-city/:id", element: <UpdateCity /> },
    ],
  },
]);
