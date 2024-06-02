import { AccountData } from "./suiType";
import { keypairFromSecretKey, signature } from "./sui";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { NetworkName } from "@polymedia/suits";
import { SerializedSignature } from "@mysten/sui.js/cryptography";
const NETWORK: NetworkName = "devnet";

const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
});

type CandidateResult = {
  candidate_id: string | undefined;
  success: boolean;
};
export async function NewCandidate(
  account: AccountData,
  event_id: String,
): Promise<CandidateResult> {
  let candidateResult: CandidateResult = {
    candidate_id: "",
    success: false,
  };
  const new_candidate = import.meta.env.VITE_NEW_CANDIDATE;
  const txb = new TransactionBlock();
  txb.setSender(account.userAddr);
  txb.moveCall({
    target: new_candidate,
    arguments: [txb.pure(event_id)],
  });
  const ephemeralKeyPair = keypairFromSecretKey(account.ephemeralPrivateKey);
  const { bytes, signature: userSignature } = await txb.sign({
    client: suiClient,
    signer: ephemeralKeyPair,
  });

  const zkLoginSignature: SerializedSignature = signature(
    account,
    userSignature,
  );

  await suiClient
    .executeTransactionBlock({
      transactionBlock: bytes,
      signature: zkLoginSignature,
      options: {
        showEffects: true,
      },
    })
    .then((result) => {
      candidateResult.success = true;
      candidateResult.candidate_id =
        result.effects?.created?.[0]?.reference?.objectId;
    })
    .catch((error: unknown) => {
      console.warn("[sendTransaction] executeTransactionBlock failed:", error);
      candidateResult.success = false;
    });

  return candidateResult;
}
