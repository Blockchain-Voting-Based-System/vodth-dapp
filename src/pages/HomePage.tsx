import { useEffect, useState } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { WalletStatus } from "../components/wallet/WalletStatus";
import { LoginPage } from "./auth/LoginPage";

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <>
      <div className="bg-gray-500 p-10 rounded-lg">
        <WalletStatus />
        <LoginPage />
      </div>
      <div className="flex h-screen bg-slate-900 dark:bg-gray-900">
        <section className="w-[10%] sm:w-[15%]">
          <Sidebar />
        </section>
        <section className="flex flex-col w-[90%] sm:w-[85%] overflow-auto">
          <Main />
        </section>
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded"
        onClick={() => setDarkMode(!darkMode)}
      >
        Dark Mode
      </button>
    </>
  );
};

export default HomePage;
