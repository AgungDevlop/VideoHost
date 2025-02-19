import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadVideo from "./pages/UploadVideo";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import PaymentMethod from "./pages/PaymentMethod";
import { Contact } from "./pages/Contact";
import { Download } from "./pages/Download";
import Redirect from "./pages/Redirect";
import EarningsHistory from "./pages/EarningsHistory";
import WithdrawalHistory from "./pages/WithdrawalHistory"; // Pastikan sudah diimport
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import Disclaimer from "./pages/Disclaimer";
import { PlayVideo } from "./pages/PlayVideo";

const ErrorFallback = (
  <div className="text-center text-red-500 p-4">
    <h1 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h1>
    <p>Maaf, terjadi kesalahan yang tidak terduga.</p>
    <button
      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      onClick={() => window.location.reload()}
    >
      Muat Ulang Halaman
    </button>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: ErrorFallback,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: ErrorFallback,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: ErrorFallback,
      },
      {
        path: "register",
        element: <Register />,
        errorElement: ErrorFallback,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        errorElement: ErrorFallback,
      },
      {
        path: "upload",
        element: (
          <ProtectedRoute>
            <UploadVideo />
          </ProtectedRoute>
        ),
        errorElement: ErrorFallback,
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
        errorElement: ErrorFallback,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        errorElement: ErrorFallback,
      },
      {
        path: "payment-method",
        element: (
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        ),
        errorElement: ErrorFallback,
      },
      {
        path: "earnings-history",
        element: (
          <ProtectedRoute>
            <EarningsHistory />
          </ProtectedRoute>
        ),
        errorElement: ErrorFallback,
      },
      {
        path: "withdrawal-history",
        element: (
          <ProtectedRoute>
            <WithdrawalHistory />
          </ProtectedRoute>
        ),
        errorElement: ErrorFallback,
      },
      {
        path: "download",
        element: <Download />,
        errorElement: ErrorFallback,
      },
      {
        path: "contact",
        element: <Contact />,
        errorElement: ErrorFallback,
      },
      {
        path: ":id",
        element: <PlayVideo />,
        errorElement: ErrorFallback,
      },
      {
        path: "e/:id",
        element: <PlayVideo />,
        errorElement: ErrorFallback,
      },
      {
        path: "s/:id",
        element: <Redirect />,
        errorElement: ErrorFallback,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
        errorElement: ErrorFallback,
      },
      {
        path: "about-us",
        element: <AboutUs />,
        errorElement: ErrorFallback,
      },
      {
        path: "terms-and-conditions",
        element: <TermsAndConditions />,
        errorElement: ErrorFallback,
      },
      {
        path: "disclaimer",
        element: <Disclaimer />,
        errorElement: ErrorFallback,
      },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary fallback={ErrorFallback}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
