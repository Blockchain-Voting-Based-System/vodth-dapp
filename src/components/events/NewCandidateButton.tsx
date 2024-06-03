import { Modal } from "@polymedia/webutils";
import { useState } from "react";
import { NewCandidate } from "../../utils/newCandidate";
import { AccountData } from "../../utils/suiType";

type NewCandidateButtonProps = {
  account: AccountData;
};

export const NewCandidateButton = ({ account }: NewCandidateButtonProps) => {
  const [modalContent, setModalContent] = useState<string>("");

  async function createCandidate() {
    const event_id =
      "0xda237562d0137ae1e2da79d01f80c595f8f14de8745bc5dae6d6e0354819a818";
    setModalContent("🚀 Creating Candidate...");
    const result = await NewCandidate(account, event_id);

    if (result.success) {
      setModalContent("🎉 Candidate created successfully!");
      console.log(result.candidate_id);
    } else {
      setModalContent("❌ Candidate creation failed!");
    }
  }
  return (
    <div id="page">
      <Modal content={modalContent} />
      <div className="account" key={account.userAddr}>
        <button
          className={"btn-send bg-blue-500 px-10 py-2 text-white rounded-lg"}
          onClick={() => {
            createCandidate();
          }}
        >
          Create Candidate
        </button>
      </div>
    </div>
  );
};
