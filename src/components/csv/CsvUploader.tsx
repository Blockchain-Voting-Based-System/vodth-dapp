import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import { renderToString } from "react-dom/server";
import { firestore } from "../../firebase";
import { useGenerateSecret } from "../../services/useGenerateSecret";
import EmailTemplate from "../email/EmailTemplate";

const CsvUploader: React.FC = () => {
  const [csvData, setCsvData] = useState<any[]>([]);

  const handleFileLoaded = (data: any) => {
    console.log("File loaded");
    setCsvData(data);
  };

  const handleUploadCsv = async () => {
    try {
      console.log("File is uploaded");

      const eventName = "event_name";
      const eventDoc = doc(firestore, "events", eventName);
      const votersCollection = collection(eventDoc, "voters");

      for (const row of csvData) {
        if (row.email === "") {
          continue;
        }

        // Generate a hash of the email and add it as the 'secret' field
        const secret = useGenerateSecret(row.email);
        row.secret = secret;

        // Add voter data to the voters collection
        const voterDocRef = await addDoc(votersCollection, row);

        // Render the EmailTemplate component to HTML
        const emailHtml = renderToString(
          <EmailTemplate eventName={eventName} secretCode={secret} />,
        );

        // Construct the email payload
        const emailPayload = {
          to: [row.email],
          message: {
            subject: `Vodth, Voting Secret for ${eventName}`,
            html: emailHtml,
            event: eventName,
            voterDocPath: voterDocRef.path,
          },
        };

        // Add emailPayload to the mail collection
        const emailCollection = collection(firestore, "mail");
        await addDoc(emailCollection, emailPayload);
      }
    } catch (error) {
      console.error("Error uploading CSV data: ", error);
    }
  };

  return (
    <>
      <CSVReader
        parserOptions={{ header: true }}
        onFileLoaded={handleFileLoaded}
      />
      <button className="bg-blue-500 px-10 py-2" onClick={handleUploadCsv}>
        Upload
      </button>
    </>
  );
};

export default CsvUploader;
