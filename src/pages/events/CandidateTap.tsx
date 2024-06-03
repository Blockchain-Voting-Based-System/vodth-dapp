import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";

const CandidateTap = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(
    null,
  );

  interface Position {
    name: string;
    code: string;
  }
  const positions: Position[] = [
    { name: "President", code: "Pr" },
    { name: "Lecturer", code: "Le" },
    { name: "Student", code: "Student" },
  ];

  const inputStyle = { border: "1px solid black" };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between gap-4">
        <div className="w-1/2">
          <label htmlFor="firstName" className="block font-bold text-sm">
            First Name
          </label>
          <InputText
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full"
            style={inputStyle}
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="secondName" className="block font-bold text-sm">
            Second Name
          </label>
          <InputText
            id="secondName"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            className="w-full"
            style={inputStyle}
          />
        </div>
      </div>
      <div>
        <label htmlFor="position" className="block font-bold text-sm">
          Position
        </label>
        <Dropdown
          value={selectedPosition}
          onChange={(e: DropdownChangeEvent) => setSelectedPosition(e.value)}
          options={positions}
          optionLabel="name"
          placeholder="Select a Position"
          className="w-full md:w-14rem"
          style={inputStyle}
        />
       
      </div>
      <div>
        <label htmlFor="photo" className="block text-sm font-bold">
          Photo
        </label>
        <div style={{ border: "1px solid black", padding: "5px" }}>
          <FileUpload
            name="candidatepic"
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
    </div>
  );
};

export default CandidateTap;
