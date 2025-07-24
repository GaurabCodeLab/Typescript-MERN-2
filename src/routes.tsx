import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CommonLayout from "./layout/CommonLayout";

export const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];
