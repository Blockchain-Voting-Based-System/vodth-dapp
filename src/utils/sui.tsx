import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import {
  decodeSuiPrivateKey,
  SerializedSignature,
} from "@mysten/sui.js/cryptography";
import { genAddressSeed, getZkLoginSignature } from "@mysten/zklogin";
import { AccountData } from "./suiType";
const accountDataKey = import.meta.env.VITE_ACCOUNT_DATA_KEY;
export function loadAccounts(): AccountData[] {
  const dataRaw = sessionStorage.getItem(accountDataKey);
  if (!dataRaw) {
    return [];
  }
  const data: AccountData[] = JSON.parse(dataRaw);
  return data;
}

export function keypairFromSecretKey(privateKeyBase64: string): Ed25519Keypair {
  const keyPair = decodeSuiPrivateKey(privateKeyBase64);
  return Ed25519Keypair.fromSecretKey(keyPair.secretKey);
}

export function signature(
  account: AccountData,
  userSignature: SerializedSignature,
): SerializedSignature {
  const addressSeed = genAddressSeed(
    BigInt(account.userSalt),
    "sub",
    account.sub,
    account.aud,
  ).toString();

  const zkLoginSignature: SerializedSignature = getZkLoginSignature({
    inputs: {
      ...account.zkProofs,
      addressSeed,
    },
    maxEpoch: account.maxEpoch,
    userSignature,
  });

  return zkLoginSignature;
}
