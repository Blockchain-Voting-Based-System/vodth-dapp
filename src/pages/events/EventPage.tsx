import RequestFaucetButton from "../../components/events/RequestFaucetButton";
import { NewEventButton } from "../../components/events/NewEventButton";
import { NewCandidateButton } from "../../components/events/NewCandidateButton";
import { loadAccounts } from "./../../utils/sui";
import { AccountData } from "../../utils/suiType";
import { useRef } from "react";
const EventPage = () => {
  const accounts = useRef<AccountData[]>(loadAccounts());
  const account = accounts.current[0];
  return (
    <>
      <RequestFaucetButton />
      <NewEventButton account={account} />
      <NewCandidateButton account={account} />
    </>
  );
};

export default EventPage;
