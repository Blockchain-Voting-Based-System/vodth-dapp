import { WalletStatus } from "../components/wallet/WalletStatus";
import { LoginPage } from "./auth/LoginPage";

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-500 p-10 rounded-lg">
        <WalletStatus />
        <LoginPage />
      </div>
    </>
  );
};

export default HomePage;
