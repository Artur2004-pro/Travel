// src/route.config.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
// Layouts
import Layout from "./pages/general/layout"; // ընդհանուր կայքի layout (header + footer)
import AdminLayout from "./pages/admin/admin-layout";
import TripLayout from "./pages/trip/trip-layout";
import TripDashboard from "./pages/trip/trip-layout";
// Lazy pages
const Home = lazy(() => import("./pages/general/home"));
const Login = lazy(() => import("./pages/general/login"));
const Signup = lazy(() => import("./pages/general/signup"));
const AboutPage = lazy(() => import("./pages/general/about"));
const BeAdmin = lazy(() => import("./pages/admin/be-admin"));
// Settings
const Settings = lazy(() => import("./pages/settings/setting"));
const UpdatePassword = lazy(() => import("./pages/settings/update-password"));
const UpdateUsername = lazy(() => import("./pages/settings/update-username"));
// Admin
const Admin = lazy(() => import("./pages/admin/admin"));
const Country = lazy(() => import("./pages/admin/country"));
const AddCountry = lazy(() => import("./pages/admin/add-country"));
const EditCountry = lazy(() => import("./pages/admin/edit-country"));
const City = lazy(() => import("./pages/admin/city"));
const AddCity = lazy(() => import("./pages/admin/add-city"));
const EditCity = lazy(() => import("./pages/admin/edit-city"));
const Users = lazy(() => import("./pages/admin/users"));
const EditUser = lazy(() => import("./pages/admin/edit-user"));
// Trip Wizard (միայն նոր trip ստեղծելու համար)
const Trip = lazy(() => import("./pages/trip/trip")); // wizard-ի layout (sidebar)
const TripCountry = lazy(() => import("./pages/trip/steps/country"));
const TripPlanning = lazy(() => import("./pages/trip/steps/planning"));
const TripCity = lazy(() => import("./pages/trip/steps/city"));
const SelectHotel = lazy(() => import("./pages/trip/steps/hotel"));
const DayPlanning = lazy(() => import("./pages/trip/steps/day-planning"));
const TripFinish = lazy(() => import("./pages/trip/steps/finish"));
// Trip Management (նախկին my-trips, view, edit)
const MyTrips = lazy(() => import("./pages/trip/my-trips"));
const TripView = lazy(() => import("./pages/trip/trip-view"));
const EditTrip = lazy(() => import("./pages/trip/edit-trip"));
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
);
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // ընդհանուր layout (header + footer)
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loader />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: "be-admin",
        element: (
          <Suspense fallback={<Loader />}>
            <BeAdmin />
          </Suspense>
        ),
      },
      // Settings
      {
        path: "settings",
        element: (
          <Suspense fallback={<Loader />}>
            <Settings />
          </Suspense>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          {
            path: "profile",
            element: (
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            ),
          },
          {
            path: "update-password",
            element: (
              <Suspense fallback={<Loader />}>
                <UpdatePassword />
              </Suspense>
            ),
          },
          {
            path: "update-username",
            element: (
              <Suspense fallback={<Loader />}>
                <UpdateUsername />
              </Suspense>
            ),
          },
          { path: "*", element: <Navigate to="/settings/profile" replace /> },
        ],
      },
      // Admin
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <Admin />
              </Suspense>
            ),
          },
          {
            path: "country",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <Country />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AddCountry />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<Loader />}>
                    <EditCountry />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "city",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <City />
                  </Suspense>
                ),
              },
              {
                path: "add",
                element: (
                  <Suspense fallback={<Loader />}>
                    <AddCity />
                  </Suspense>
                ),
              },
              {
                path: "edit/:id",
                element: (
                  <Suspense fallback={<Loader />}>
                    <EditCity />
                  </Suspense>
                ),
              },
            ],
          },
          {
            path: "users",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<Loader />}>
                    <Users />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                element: (
                  <Suspense fallback={<Loader />}>
                    <EditUser />
                  </Suspense>
                ),
              },
            ],
          },
          { path: "*", element: <Navigate to="/admin" replace /> },
        ],
      },
      // Trip Dashboard (ընդհանուր trip-ների բաժինը՝ sidebar-ով, բայց Layout-ի ներսում)
      {
        path: "trips",
        element: <TripDashboard />, // Նոր dashboard layout
        children: [
          // Default — My Trips
          { path: "", element: <MyTrips /> },
          { path: "my-trips", element: <MyTrips /> },

          // Trip View & Edit
          { path: ":id", element: <TripView /> },
          { path: "edit/:id", element: <EditTrip /> },

          // Wizard
          {
            path: "new",
            element: <Trip />, // քո հին Trip.tsx-ը (wizard-ով)
            children: [
              { path: "", element: <Navigate to="country" replace /> },
              { path: "country", element: <TripCountry /> },
              { path: "planning", element: <TripPlanning /> },
              { path: "city", element: <TripCity /> },
              { path: "hotel", element: <SelectHotel /> },
              { path: "day-planning", element: <DayPlanning /> },
              { path: "finish", element: <TripFinish /> },
              { path: "*", element: <Navigate to="country" replace /> },
            ],
          },
        ],
      },
      // Catch-all
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);
export default router;
