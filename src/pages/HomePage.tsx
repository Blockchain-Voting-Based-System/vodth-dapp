import { Link } from "react-router-dom";
import { WalletStatus } from "../components/wallet/WalletStatus";
import { LoginPage } from "./auth/LoginPage";
import { Button } from "@/components/ui/button";
const HomePage = () => {
  return (
    <>
      <div className="">
        <Button className="rounded-full" variant={"outline"}>
          <Link to={"/events"}>New Event </Link>
        </Button>
        <WalletStatus />
        <LoginPage />
      </div>
    </>
  );
};

export default HomePage;
