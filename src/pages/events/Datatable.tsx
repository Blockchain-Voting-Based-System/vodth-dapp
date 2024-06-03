import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import HeaderTemplate from "./HeaderDatatable";
import ImageCell from "./ImageCell";
import StatusCell from "./StatusCell";
import logoImage from "./../../img/profile.png";
import vlogo from "./../../img/Vlogo.png";
import { useState, useEffect } from "react";

const Datatable = () => {
  interface Event {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    votingStatus: string;
  }

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
    <DataTable value={events} header={<HeaderTemplate />} tableStyle={{ minWidth: "60rem" }}>
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column header="Image" body={(rowData) => <ImageCell event={rowData} />}></Column>
      <Column field="description" header="Description"></Column>
      <Column header="Status" body={(rowData) => <StatusCell event={rowData} />}></Column>
    </DataTable>
  );
};

export default Datatable;
