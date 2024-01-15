import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddCar from "../pages/addCar";
import Dashboard from "../pages/Dashboard";
import CarList from "../pages/CarList";
import LoginPage from "../pages/LoginPage";
import ProtectedLogin from "../hoc/ProtectedLogin";
import ProtectedRoute from "../hoc/ProtectedRoute";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addCar",
    element: (
      <ProtectedRoute>
        <AddCar />
      </ProtectedRoute>
    ),
  },
  {
    path: "/listCar",
    element: (
      <ProtectedRoute>
        <CarList />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: (
      <ProtectedLogin>
        <LoginPage />
      </ProtectedLogin>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={routers} />;
};

export default Router;
