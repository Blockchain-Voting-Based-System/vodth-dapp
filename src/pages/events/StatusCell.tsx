import React from "react";
import { Tag } from "primereact/tag";

interface Event {
  event: {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    votingStatus: string;
  };
}

const StatusCell: React.FC<Event> = ({ event }) => {
  const getSeverity = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "info";

      case "In Progress":
        return "warning";

      case "Completed":
        return "success";

      case "Cancelled":
        return "danger";

      default:
        return null;
    }
  };

  return (
    <Tag
      value={event.votingStatus}
      severity={getSeverity(event.votingStatus)}
      className="p-tag-rounded"
    />
  );
};

export default StatusCell;
