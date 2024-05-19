import { Outlet } from "react-router-dom";
import AppNavigation from "../components/AppNavigation";

const DefaultLayout = () => {
  return (
    <>
      <AppNavigation />
      <main className="max-w-screen-2xl mx-auto py-10">
        <Outlet />
      </main>
    </>
  );
};

export default DefaultLayout;
