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

export async function NewEvent(account: AccountData): Promise<boolean> {
  let create_result = false;
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
      console.debug(
        "[sendTransaction] executeTransactionBlock response:",
        result,
      );
      create_result = true;
    })
    .catch((error: unknown) => {
      console.warn("[sendTransaction] executeTransactionBlock failed:", error);
      create_result = false;
    });

  return create_result;
}
