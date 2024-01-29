import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddCar from "../pages/addCar";
import Dashboard from "../pages/Dashboard";
import CarList from "../pages/CarList";
import LoginPage from "../pages/LoginPage";
import EditCar from "../pages/EditCar";
import ProtectedLogin from "../hoc/ProtectedLogin";
import ProtectedRoute from "../hoc/ProtectedRoute";
import HomePage from "../pages/HomePage";

const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "carList",
        element: (
          <ProtectedRoute>
            <CarList />
          </ProtectedRoute>
        ),
      },
    ],
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
    path: "/login",
    element: (
      <ProtectedLogin>
        <LoginPage />
      </ProtectedLogin>
    ),
  },
  {
    path: "/editCar",
    element: (
      <ProtectedRoute>
        <EditCar />
      </ProtectedRoute>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={routers} />;
};

export default Router;
