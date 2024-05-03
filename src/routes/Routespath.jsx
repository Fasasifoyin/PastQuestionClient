import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AllQuestions,
  CreatePage,
  Edit,
  Home,
  Layout,
  QuizPage,
  ResultPage,
} from "..";
import ProtectResult from "./ProtectResult";
import ProtectQuizPage from "./ProtectQuizPage";
import CorrectionPage from "../pages/CorrectionPage";
import PrivateRoute from "./PrivateRoute";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/quiz",
        element: (
          <ProtectQuizPage>
            <QuizPage />
          </ProtectQuizPage>
        ),
      },
      {
        path: "/result",
        element: (
          <ProtectResult>
            <ResultPage />
          </ProtectResult>
        ),
      },
      {
        path: "/correction",
        element: (
          <ProtectResult>
            <CorrectionPage />
          </ProtectResult>
        ),
      },
      {
        path: "/create",
        element: (
          <PrivateRoute>
            <CreatePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/allquestions",
        element: (
          <PrivateRoute>
            <AllQuestions />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <PrivateRoute>
            <Edit />
          </PrivateRoute>
        ),
      },
    ],
  },
];

const RoutesPath = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default RoutesPath;
