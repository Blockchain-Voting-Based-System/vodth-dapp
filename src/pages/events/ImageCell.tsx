import React from "react";

interface Event{
  event: {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    votingStatus: string;
  };
}

const ImageCell: React.FC<Event> = ({ event }) => {
  return (
    <img
      src={event.image}
      alt={event.name}
      className="w-6rem shadow-2 border-round m-2"
      style={{ width: "50px", height: "50px" }}
    />
  );
};

export default ImageCell;
