import { addDoc, collection, doc } from "firebase/firestore";
import CSVReader from "react-csv-reader";
import { firestore } from "../../firebase";
import { useGenerateSecret } from "../../services/useGenerateSecret";

const CsvUploader = () => {
  return (
    <>
      <CSVReader
        parserOptions={{ header: true }}
        onFileLoaded={(data) => {
          console.log("onFileLoaded called");

          try {
            const eventName = "event_name";
            const eventDoc = doc(firestore, "events", eventName);
            const votersCollection = collection(eventDoc, "voters");

            data.forEach(async (row) => {
              if (row.email === "") {
                return;
              }

              // Generate a hash of the email and add it as the 'secret' field
              row.secret = useGenerateSecret(row.email);

              await addDoc(votersCollection, row);
            });
            console.log("CSV data uploaded successfully");
          } catch (error) {
            console.error("Error uploading CSV data: ", error);
          }
        }}
      />
    </>
  );
};

export default CsvUploader;
