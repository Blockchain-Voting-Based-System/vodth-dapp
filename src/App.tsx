import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';                       
                       
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import EventPage from "./pages/events/EventPage";
import NewEventPage from "./pages/events/NewEventPage";
import Entire from "./pages/dashboard/entire/Entire";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/dashboard" element={<Entire />} />
      <Route path="/events/new" element={<NewEventPage />} />
      <Route path="events" element={<EventPage />} />
      <Route path="login" element={<LoginPage />} />
    </Route>
  ),
);

function App() {
  
  
  return (
    <>
      <RouterProvider router={router} />

      
    </>
  );
}

export default App;
