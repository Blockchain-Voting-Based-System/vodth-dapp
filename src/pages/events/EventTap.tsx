import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";

const EventTap = () => {
  const [eventName, setEventName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [bio, setBio] = useState<string>("");

  const inputStyle = { border: "1px solid black" };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="eventName" className="block font-bold text-sm">
          Event Name
        </label>
        <InputText
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="w-full"
          style={inputStyle}
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-1/2">
          <label htmlFor="startDate" className="block font-bold text-sm">
            Start Date
          </label>
          <Calendar
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.value as Date)}
            className="w-full"
            dateFormat="MM d, yy"
            style={inputStyle}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="endDate" className="block font-bold text-sm">
            End Date
          </label>
          <Calendar
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.value as Date)}
            className="w-full"
            dateFormat="MM d, yy"
            style={inputStyle}
          />
        </div>
      </div>
      <div>
        <label htmlFor="bio" className="block font-bold text-sm">
          Bio
        </label>
        <InputTextarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="banner" className="block text-sm font-bold">
          Banner
        </label>
        <div style={{ border: "1px solid black", padding: "5px" }}>
          <FileUpload
            name="banner"
            customUpload={true}
            uploadHandler={() => {}}
            mode="basic"
            className="w-full"
            chooseOptions={{
              label: "Choose",
              icon: "pi pi-upload",
              className: "p-button-text p-button-plain",
              style: { fontWeight: "bold", color: "black" },
            }}
          />
        </div>
      </div>
      <div className="flex justify-start pt-4 font-bold">
        <Button
          label="Submit"
          iconPos="right"
          onClick={() => {}}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            width: "70px",
          }}
        />
      </div>
    </div>
  );
};

export default EventTap;
