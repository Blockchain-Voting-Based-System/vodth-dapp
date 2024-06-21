import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { NetworkName } from "@polymedia/suits";
const NETWORK: NetworkName = "devnet";

const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
});

type CandidateResult = {
  candidate_id: string | undefined;
  success: boolean;
};
export async function NewCandidate(event_id: String): Promise<CandidateResult> {
  let candidateResult: CandidateResult = {
    candidate_id: "",
    success: false,
  };
  const MNEMONICS = import.meta.env.VITE_MNEMONICS;
  const new_candidate = import.meta.env.VITE_NEW_CANDIDATE;
  const ephemeralKeyPair = Ed25519Keypair.deriveKeypair(MNEMONICS);
  const userAdd = ephemeralKeyPair.getPublicKey().toSuiAddress();
  const txb = new TransactionBlock();
  txb.setSender(userAdd);
  txb.moveCall({
    target: new_candidate,
    arguments: [txb.pure(event_id)],
  });

  await suiClient
    .signAndExecuteTransactionBlock({
      transactionBlock: txb,
      signer: ephemeralKeyPair,
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
