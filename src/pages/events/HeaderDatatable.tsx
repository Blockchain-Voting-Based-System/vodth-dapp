import { Button } from "primereact/button";

const HeaderDatatable = () => {
  return (
    <div className="flex flex-wrap align-items-center justify-between gap-2">
      <span className="text-xl text-900 font-bold">Events</span>
      <div>
        <Button
          icon="pi pi-refresh"
          className="p-button-rounded p-button-secondary"
          iconPos="right"
        />
      </div>
    </div>
  );
};

export default HeaderDatatable;
