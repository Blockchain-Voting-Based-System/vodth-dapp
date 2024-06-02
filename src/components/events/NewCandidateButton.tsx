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
      "0xbc17dd5b95327f1929b7ff68468ed7f2ebbb20f7486ee19fee014f95b27f1932";
    setModalContent("🚀 Creating Candidate...");
    const result = await NewCandidate(account, event_id);

    if (result) {
      setModalContent("🎉 Candidate created successfully!");
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
