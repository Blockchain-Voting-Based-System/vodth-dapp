import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import EventPage from "./pages/EventPage";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<HomePage />} />
      <Route path="events" element={<EventPage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
