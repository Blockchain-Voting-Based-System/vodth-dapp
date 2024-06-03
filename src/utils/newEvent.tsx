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

type EventResult = {
  event_id: string | undefined;
  success: boolean;
};

export async function NewEvent(account: AccountData): Promise<EventResult> {
  let eventResult: EventResult = {
    event_id: "",
    success: false,
  };
  const new_event = import.meta.env.VITE_NEW_EVENT;
  const txb = new TransactionBlock();
  txb.setSender(account.userAddr);
  const [event] = txb.moveCall({ target: new_event });
  txb.transferObjects([event], account.userAddr);
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
      eventResult.success = true;
      eventResult.event_id = result.effects?.created?.[0]?.reference?.objectId;
    })
    .catch((error: unknown) => {
      console.warn("[sendTransaction] executeTransactionBlock failed:", error);
      eventResult.success = false;
    });

  return eventResult;
}
