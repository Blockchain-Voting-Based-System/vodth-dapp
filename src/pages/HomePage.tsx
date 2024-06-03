import { SuiAccount } from "../components/account/SuiAccount";
import { WalletStatus } from "../components/wallet/WalletStatus";

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-500 p-10 rounded-lg">
        <WalletStatus />
        <SuiAccount />
      </div>
    </>
  );
};

export default HomePage;
