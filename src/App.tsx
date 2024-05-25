import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import EventPage from "./pages/events/EventPage";
import NewEventPage from "./pages/events/NewEventPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<HomePage />} />
      <Route path="events" element={<EventPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="events/new" element={<NewEventPage />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
