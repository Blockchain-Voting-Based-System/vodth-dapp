import { Link } from "react-router-dom";
import RequestFaucetButton from "../../components/events/RequestFaucetButton";

const EventPage = () => {
  return (
    <>
      <RequestFaucetButton />
      <Link to="new">New Event</Link>
    </>
  );
};

export default EventPage;
