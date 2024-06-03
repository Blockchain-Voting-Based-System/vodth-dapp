import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";
const CsvTap = () => {
  const [SecretID, setSecretID] = useState<string>("");
  const inputStyle = { border: "1px solid black" };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <label htmlFor="eventName" className="block font-bold text-sm">
          Event Name
        </label>
        <InputText
          id="SecretID"
          value={SecretID}
          onChange={(e) => setSecretID(e.target.value)}
          className="w-full"
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="photo" className="block text-sm font-bold">
          File
        </label>
        <div style={{ border: "1px solid black", padding: "5px" }}>
          <FileUpload
            name="file"
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
export default CsvTap;
