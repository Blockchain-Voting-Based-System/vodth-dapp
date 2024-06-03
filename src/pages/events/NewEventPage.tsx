import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import EventTap from "./EventTap";
import CandidateTap from "./CandidateTap";
import CsvTap from "./CsvTap";

const NewEventPage = () => {
  const steps = [
    {
      header: "Event",
      content: <EventTap />,
    },
    {
      header: "Candidate",
      content: (
        <CandidateTap/>
      ),
    },
    {
      header: "CSV",
      content: (
       <CsvTap/>
      ),
    },
  ];
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg">
        <Stepper>
          {steps.map((step, index) => (
            <StepperPanel header={step.header} key={index}>
              {step.content}
            </StepperPanel>
          ))}
        </Stepper>
      </div>
    </div>
    
  );
};

export default NewEventPage;
