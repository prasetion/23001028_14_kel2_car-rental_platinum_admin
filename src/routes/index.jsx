import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddCar from "../pages/addCar";
import Dashboard from "../pages/Dashboard";
import CarList from "../pages/CarList";
import LoginPage from "../pages/LoginPage";
import EditCar from "../pages/EditCar";
import ProtectedLogin from "../hoc/ProtectedLogin";
import ProtectedRoute from "../hoc/ProtectedRoute";
import DeleteCar from "../components/DeleteCar";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/addCar",
    element: <AddCar />,
  },
  {
    path: "/listCar",
    element: <CarList />,
  },
  {
    path: "/editCar",
    element: <EditCar />,
  },
  {
    path: "/deletecar",
    element: <DeleteCar/>,
  }
]);

const Router = () => {
  return <RouterProvider router={routers} />;
};

export default Router;
