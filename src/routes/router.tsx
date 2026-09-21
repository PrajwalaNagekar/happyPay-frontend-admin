import { type RouteObject } from "react-router-dom";

import ProtectedRoutes from "../components/auth/ProtectedRoutes";

import AppLayout from "../layout/full/AppLayout";
import BlankLayout from "../layout/blank/BlankLayout";

import RetailerLogin from "../pages/retailer/auth/RetailerLogin";
import RetailerRegister from "../pages/retailer/auth/Register";
import Dashboard from "../pages/Dasboard/Dashboard";
import RetailerKycPending from "../pages/retailer/auth/RetailerKYCPending";
import RetailerKycApproved from "../pages/retailer/auth/RetailerKYCApproved";

import Aeps from "../pages/retailer/aeps/Aeps";
import Dmt from "../pages/retailer/dmt/Dmt";
import Cms from "../pages/retailer/cms/Cms";

// TRANSACTIONS
import Transactions from "../pages/history/Transactions"

// PROFILE
import Profile from "../pages/retailer/profile/Profile";
import ShopInformation from "../pages/retailer/profile/ShopInformation";
import BankDetails from "../pages/retailer/profile/BankDetails";
import SecuritySettings from "../pages/retailer/profile/SecuritySettings";
import HelpSupport from "../pages/retailer/profile/HelpSupport";

const Router: RouteObject[] = [
  // ADMIN
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

  // RETAILER
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

          // AEPS
          {
            path: "aeps",
            element: <Aeps />,
          },

          // DMT
          {
            path: "dmt",
            element: <Dmt />,
          },

          // CMS
          {
            path: "cms",
            element: <Cms />,
          },

          // TRANSACTIONS
          {
            path: "transactions",
            element: <Transactions />,
          },

          // PROFILE
          {
            path: "profile",
            element: <Profile />,
          },

          // SHOP INFORMATION
          {
            path: "profile/shop",
            element: <ShopInformation />,
          },

          // BANK DETAILS
          {
            path: "profile/bank",
            element: <BankDetails />,
          },

          // SECURITY SETTINGS
          {
            path: "profile/security",
            element: <SecuritySettings />,
          },

          // HELP & SUPPORT
          {
            path: "profile/support",
            element: <HelpSupport />,
          },
        ],
      },
    ],
  },

  // ROOT — redirect to retailer login
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <RetailerLogin />,
      },
    ],
  },

  // RETAILER LOGIN
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

  // RETAILER REGISTER
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

  // KYC PENDING
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

  // KYC APPROVED
  {
    path: "/retailer/kyc-approved",
    element: <BlankLayout />,
    children: [
      {
        index: true,
        element: <RetailerKycApproved />,
      },
    ],
  },
];

export default Router;