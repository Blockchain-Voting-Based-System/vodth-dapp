import { Outlet } from 'react-router-dom';
import Sidebar from "../pages/dashboard/sidebar/Sidebar";

const DefaultLayout = () => {
  return (
    <div className="flex h-screen ">
      <section className="w-[15%] sm:w-[15%] md:w-[20%] lg:w-[15%] xl:w-[15%] overflow-auto">
        <Sidebar />
      </section>
      <main className="flex-grow h-full overflow-auto  ">
        <Outlet/>
      </main>
    </div>
  );
};

export default DefaultLayout;
