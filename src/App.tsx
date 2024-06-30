import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import Event from "./pages/events/Event.tsx";
import EventPage from "./pages/events/EventsPage.tsx";
import NewEventPage from "./pages/events/EventNewPage.tsx";
import EventDetailsPage from "./pages/events/EventEditPage.tsx";
import NewCandidate from "./pages/candidates/CandidateNewPage.tsx";
import CandidatesPage from "./pages/candidates/CandidatesPage.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeicons/primeicons.css';
import CandidatesList from "./components/candidatesList/CandidateList.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="event" element={<Event/>} />
        <Route path="events" element={<EventPage />} />
        <Route path="events/new" element={<NewEventPage />} />
        <Route path="events/:event_id" element={<EventDetailsPage />} />
        <Route path="events/:event_id" element={<EventDetailsPage />} />
        <Route
          path="events/:event_id/candidates"
          element={<CandidatesList candidates={undefined} eventId={undefined}></CandidatesList>}
        ></Route>
        <Route
          path="events/:event_id/candidates/new"
          element={<NewCandidate />}
        />
      </Route>
      <Route path="login" element={<LoginPage />} />
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
