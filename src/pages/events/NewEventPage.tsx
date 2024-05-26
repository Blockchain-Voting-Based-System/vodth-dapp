// import CsvUploader from "../../components/csv/CsvUploader";
import { EventForm } from "@/components/events/EventForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
const NewEventPage = () => {
  const { toasts, dismiss } = useToast();
  return (
    <div className="mx-auto w-ful">
      {/* <CsvUploader /> */}
      <EventForm />
      <div className="fixed bottom-0 right-0 p-6 space-y-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className=" p-4 rounded shadow-lg border border-gray-200 relative"
          >
            <h4 className="font-bold">{toast.title}</h4>
            <p>{toast.description}</p>
            <Button
              variant={"destructive"}
              size={"icon"}
              className="absolute top-0 right-0"
              onClick={() => {
                dismiss(toast.id);
              }}
            >
              X
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewEventPage;
