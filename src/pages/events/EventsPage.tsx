import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { Link } from "react-router-dom";
// const header = ["Subject", "Type", "Duration", "Created by", "Date", "Status"];
const EventPage = () => {
  const [events, setEvents] = useState<DocumentData>([]);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchEvents = async () => {
      const q = query(collection(firestore, "events"));
      const eventSnapshot = await getDocs(q);
      setEvents(eventSnapshot.docs);
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-100 mx-auto py-10 px-1 sm:px-2 lg:px-4 max-h-screen">
      <div className="container mx-auto p-4 shadow-lg rounded-2xl bg-white">
        <div className="flex justify-between justify-items-center">
          <h2 className="text-2xl font-semibold h-12 my-4">Events List</h2>
          <button
            onClick={() => {
              window.location.href = "/event";
            }}
            className=" bg-blue-400 h-12 rounded-md p-2 m-4"
          >
            New Events
          </button>
        </div>
        <hr />
        <div className="overflow-x-auto my-2">
          <div className="">
            <div className="flex justify-around bg-gray-100 p-4 rounded-2xl my-4">
              <span className="w-1/6 overflow-x-auto">Subject</span>
              <span className="w-1/6 overflow-x-auto">Type</span>
              <span className="w-1/6 overflow-x-auto">Duration</span>
              <span className="w-1/6 overflow-x-auto">Created by</span>
              <span className="w-1/6 overflow-x-auto">Date</span>
              <span className="w-1/6 overflow-x-auto">Status</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "490px" }}>
              {events.map((event: any, index: any) => {
                return (
                  <div className="my-4" key={index}>
                    <div className="flex justify-around p-4 my-2">
                      <Link
                        to={`/events/${event.id}`}
                        className="w-1/6 text-blue-400 overflow-x-auto"
                      >
                        {event.data().name}
                      </Link>
                      <span className="w-1/6 overflow-x-auto">
                        {event.data().type}
                      </span>
                      <span className="w-1/6 overflow-x-auto">
                        {event.data().endDate}
                      </span>
                      <span className="w-1/6 overflow-x-auto">
                        {event.data().startDate}
                      </span>
                      <span className="w-1/6 overflow-x-auto">
                        {event.data().endDate}
                      </span>
                      <span className="w-1/6 overflow-x-auto">
                        {event.data().startDate}
                      </span>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
