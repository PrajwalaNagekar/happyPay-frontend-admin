import { type RouteObject } from "react-router-dom";

import ProtectedRoutes from "../components/auth/ProtectedRoutes";

import AppLayout from "../layout/full/AppLayout";
import BlankLayout from "../layout/blank/BlankLayout";

import Login from "../pages/Login";
import AdminLogin from "../pages/Login";
import RetailerLogin from "../pages/retailer/auth/RetailerLogin";
import RetailerRegister from "../pages/retailer/auth/Register";
import Dashboard from "../pages/Dasboard/Dashboard";
import RetailerKycPending from "../pages/retailer/auth/RetailerKYCPending";
import RetailerKycApproved from "../pages/retailer/auth/RetailerKYCApproved";

const Router: RouteObject[] = [
  // =========================
  // ADMIN
  // =========================
  {
    path: "/admin",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },

  // =========================
  // RETAILER
  // =========================
  {
    path: "/retailer",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },

  // =========================
  // ADMIN LOGIN
  // =========================
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
    ],
  },

  // =========================
  // RETAILER LOGIN
  // =========================
  {
    path: "/retailer/login",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <RetailerLogin />,
      },
    ],
  },
  {
    path: "/retailer/register",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <RetailerRegister />,
      },
    ],
  },
  {
    path: "/retailer/kyc-pending",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <RetailerKycPending />,
      },
    ],
  },
  {
    path: "/retailer/kyc-approved",
    // element: <ProtectedRoutes />,
    children: [
      {
        element: <BlankLayout />,
        children: [
          {
            index: true,
            element: <RetailerKycApproved />,
          },
        ],
      },
    ],
  },
];

export default Router;