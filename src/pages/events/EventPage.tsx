import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import logoImage from './../../img/profile.png';
import vlogo from './../../img/Vlogo.png';
import { useState, useEffect } from 'react';

import ImageCell from "./ImageCell";
import StatusCell from "./StatusCell";
import HeaderDatatable from "./HeaderDatatable";


interface Event {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  votingStatus: string; 
}

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents([
        {
          id: "1",
          code: "Eve1",
          name: "Student Association Election",
          description: "Choosing Student Representative",
          image: logoImage,
          votingStatus: "Completed", 
        },
        {
          id: "2",
          code: "Eve2",
          name: "Class Monitor Election",
          description: "Choosing Class Monitor Representative ",
          image: vlogo,
          votingStatus: "Progress",
        },
        {
          id: "3",
          code: "Eve3",
          name: "National Election",
          description: "Choosing new president",
          image: vlogo,
          votingStatus: "Upcoming",
        },
      ]);
  }, []);

  return (
    <>
      <div className="bg-white">
        <span className="font-bold text-md p-5">Events List</span>
        <div className="bg-gray-200 mt-5 mr-5 ml-5 p-5 rounded-lg">
          <div className="pb-5 flex justify-between items-center">
            <div className="flex justify-start">
              <Link to="/events/new">
                <Button
                  icon="pi pi-plus"
                  label="New Event"
                  iconPos="left"
                  onClick={() => {}}
                  className="p-button-outlined p-button-rounded"
                  style={{
                    background: "linear-gradient(to right, #4f46e5, #da00a1)",
                    color: "white",
                    border: "none",
                    width: "100px",
                    height: "40px"
                  }}
                />
              </Link>
            </div>
          </div>
          <div className="card">
          <DataTable value={events} header={<HeaderDatatable/>} tableStyle={{ minWidth: "60rem" }}>
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column header="Image" body={(rowData) => <ImageCell event={rowData} />}></Column>
      <Column field="description" header="Description"></Column>
      <Column header="Status" body={(rowData) => <StatusCell event={rowData} />}></Column>
    </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventPage;
