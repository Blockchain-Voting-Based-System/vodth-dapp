import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import {
  SerializedSignature,
  decodeSuiPrivateKey,
} from "@mysten/sui.js/cryptography";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import {
  genAddressSeed,
  getExtendedEphemeralPublicKey,
  getZkLoginSignature,
  jwtToAddress,
} from "@mysten/zklogin";
import {
  NetworkName,
  makeExplorerUrl,
  requestSuiFromFaucet,
  shortenSuiAddress,
} from "@polymedia/suits";
import { Modal } from "@polymedia/webutils";
import { jwtDecode } from "jwt-decode";
import { useEffect, useRef, useState } from "react";
// import "./App.less";

/* Configuration */

const NETWORK: NetworkName = "devnet";

const suiClient = new SuiClient({
  url: getFullnodeUrl(NETWORK),
});

/* Session storage keys */

const setupDataKey = "zklogin-demo.setup";
const accountDataKey = "zklogin-demo.accounts";

/* Types */

type OpenIdProvider = "Google" | "Twitch" | "Facebook";

type SetupData = {
  provider: OpenIdProvider;
  maxEpoch: number;
  randomness: string;
  ephemeralPrivateKey: string;
};

type AccountData = {
  provider: OpenIdProvider;
  userAddr: string;
  zkProofs: any;
  ephemeralPrivateKey: string;
  userSalt: string;
  sub: string;
  aud: string;
  maxEpoch: number;
};

export const SuiAccount: React.FC = () => {
  const accounts = useRef<AccountData[]>(loadAccounts()); // useRef() instead of useState() because of setInterval()
  const [balances, setBalances] = useState<Map<string, number>>(new Map()); // Map<Sui address, SUI balance>
  const [modalContent, setModalContent] = useState<string>("");

  useEffect(() => {
    completeZkLogin();
    fetchBalances(accounts.current);
    const interval = setInterval(() => fetchBalances(accounts.current), 5_000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  /* zkLogin end-to-end */

  /**
   * Complete the zkLogin process.
   * It sends the JWT to the salt server to get a salt, then
   * it derives the user address from the JWT and the salt, and finally
   * it gets a zero-knowledge proof from the Mysten Labs proving service.
   */
  async function completeZkLogin() {
    // === Grab and decode the JWT that beginZkLogin() produced ===
    // https://docs.sui.io/concepts/cryptography/zklogin#decoding-jwt

    // grab the JWT from the URL fragment (the '#...')
    const urlFragment = window.location.hash.substring(1);
    console.log("urlFragment", urlFragment);
    const urlParams = new URLSearchParams(urlFragment);
    const jwt = urlParams.get("id_token");
    if (!jwt) {
      return;
    }

    // remove the URL fragment
    window.history.replaceState(null, "", window.location.pathname);

    // decode the JWT
    const jwtPayload = jwtDecode(jwt);
    if (!jwtPayload.sub || !jwtPayload.aud) {
      console.warn("[completeZkLogin] missing jwt.sub or jwt.aud");
      return;
    }

    // === Get the salt ===
    // https://docs.sui.io/concepts/cryptography/zklogin#user-salt-management

    const requestOptions =
      import.meta.env.VITE_SALT_SERVICE_URL === "dev_salt"
        ? // dev, using a JSON file (same salt all the time)
          {
            salt: import.meta.env.VITE_USER_SALT,
          }
        : // prod, using an actual salt server
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jwt }),
          };

    if (import.meta.env.VITE_SALT_SERVICE_URL === "dev_salt") {
      console.warn(
        "[completeZkLogin] Using dev_salt, the salt will be the same every time",
      );
    } else {
      const saltResponse: { salt: string } | null = await fetch(
        import.meta.env.VITE_SALT_SERVICE_URL,
        requestOptions,
      )
        .then((res) => {
          console.debug("[completeZkLogin] salt service success");
          return res.json();
        })
        .catch((error: unknown) => {
          console.warn("[completeZkLogin] salt service error:", error);
          return null;
        });

      if (!saltResponse) {
        return;
      }
    }

    // Uncomment this line to use the salt from the server
    // const userSalt = BigInt(saltResponse.salt);

    // For testing purpose, we are using salt from env
    const userSalt = BigInt(import.meta.env.VITE_USER_SALT);

    // === Get a Sui address for the user ===
    // https://docs.sui.io/concepts/cryptography/zklogin#get-the-users-sui-address

    const userAddr = jwtToAddress(jwt, userSalt);

    // === Load and clear the data which beginZkLogin() created before the redirect ===
    const setupData = loadSetupData();
    if (!setupData) {
      console.warn("[completeZkLogin] missing session storage data");
      return;
    }
    clearSetupData();
    for (const account of accounts.current) {
      if (userAddr === account.userAddr) {
        console.warn(
          `[completeZkLogin] already logged in with this ${setupData.provider} account`,
        );
        return;
      }
    }

    // === Get the zero-knowledge proof ===
    // https://docs.sui.io/concepts/cryptography/zklogin#get-the-zero-knowledge-proof

    const ephemeralKeyPair = keypairFromSecretKey(
      setupData.ephemeralPrivateKey,
    );
    const ephemeralPublicKey = ephemeralKeyPair.getPublicKey();
    const payload = JSON.stringify(
      {
        maxEpoch: setupData.maxEpoch,
        jwtRandomness: setupData.randomness,
        extendedEphemeralPublicKey:
          getExtendedEphemeralPublicKey(ephemeralPublicKey),
        jwt,
        salt: userSalt.toString(),
        keyClaimName: "sub",
      },
      null,
      2,
    );

    console.debug("[completeZkLogin] Requesting ZK proof with:", payload);
    setModalContent("⏳ Requesting ZK proof. This can take a few seconds...");

    const zkProofs = await fetch(import.meta.env.VITE_ZK_PROVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    })
      .then((res) => {
        console.debug("[completeZkLogin] ZK proving service success");
        return res.json();
      })
      .catch((error: unknown) => {
        console.warn("[completeZkLogin] ZK proving service error:", error);
        return null;
      })
      .finally(() => {
        setModalContent("");
      });

    if (!zkProofs) {
      return;
    }

    // === Save data to session storage so sendTransaction() can use it ===
    saveAccount({
      provider: setupData.provider,
      userAddr,
      zkProofs,
      ephemeralPrivateKey: setupData.ephemeralPrivateKey,
      userSalt: userSalt.toString(),
      sub: jwtPayload.sub,
      aud:
        typeof jwtPayload.aud === "string" ? jwtPayload.aud : jwtPayload.aud[0],
      maxEpoch: setupData.maxEpoch,
    });
  }

  /**
   * Assemble a zkLogin signature and submit a transaction
   * https://docs.sui.io/concepts/cryptography/zklogin#assemble-the-zklogin-signature-and-submit-the-transaction
   */
  async function sendTransaction(account: AccountData) {
    setModalContent("🚀 Sending transaction...");

    // Sign the transaction bytes with the ephemeral private key
    const txb = new TransactionBlock();
    txb.setSender(account.userAddr);

    const ephemeralKeyPair = keypairFromSecretKey(account.ephemeralPrivateKey);
    const { bytes, signature: userSignature } = await txb.sign({
      client: suiClient,
      signer: ephemeralKeyPair,
    });

    // Generate an address seed by combining userSalt, sub (subject ID), and aud (audience)
    const addressSeed = genAddressSeed(
      BigInt(account.userSalt),
      "sub",
      account.sub,
      account.aud,
    ).toString();

    // Serialize the zkLogin signature by combining the ZK proof (inputs), the maxEpoch,
    // and the ephemeral signature (userSignature)
    const zkLoginSignature: SerializedSignature = getZkLoginSignature({
      inputs: {
        ...account.zkProofs,
        addressSeed,
      },
      maxEpoch: account.maxEpoch,
      userSignature,
    });

    // Execute the transaction
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
        fetchBalances([account]);
      })
      .catch((error: unknown) => {
        console.warn(
          "[sendTransaction] executeTransactionBlock failed:",
          error,
        );
        return null;
      })
      .finally(() => {
        setModalContent("");
      });
  }

  /**
   * Create a keypair from a base64-encoded secret key
   */
  function keypairFromSecretKey(privateKeyBase64: string): Ed25519Keypair {
    const keyPair = decodeSuiPrivateKey(privateKeyBase64);
    return Ed25519Keypair.fromSecretKey(keyPair.secretKey);
  }

  /**
   * Get the SUI balance for each account
   */
  async function fetchBalances(accounts: AccountData[]) {
    if (accounts.length == 0) {
      return;
    }
    const newBalances = new Map<string, number>();
    for (const account of accounts) {
      const suiBalance = await suiClient.getBalance({
        owner: account.userAddr,
        coinType: "0x2::sui::SUI",
      });
      newBalances.set(
        account.userAddr,
        +suiBalance.totalBalance / 1_000_000_000,
      );
    }
    setBalances((prevBalances) => new Map([...prevBalances, ...newBalances]));
  }

  function loadSetupData(): SetupData | null {
    const dataRaw = sessionStorage.getItem(setupDataKey);
    if (!dataRaw) {
      return null;
    }
    const data: SetupData = JSON.parse(dataRaw);
    return data;
  }

  function clearSetupData(): void {
    sessionStorage.removeItem(setupDataKey);
  }

  function saveAccount(account: AccountData): void {
    const newAccounts = [account, ...accounts.current];
    sessionStorage.setItem(accountDataKey, JSON.stringify(newAccounts));
    accounts.current = newAccounts;
    fetchBalances([account]);
  }

  function loadAccounts(): AccountData[] {
    const dataRaw = sessionStorage.getItem(accountDataKey);
    if (!dataRaw) {
      return [];
    }
    const data: AccountData[] = JSON.parse(dataRaw);
    return data;
  }

  function clearState(): void {
    sessionStorage.clear();
    accounts.current = [];
    setBalances(new Map());
  }

  return (
    <div id="page">
      <Modal content={modalContent} />

      <div id="network-indicator">
        <label>{NETWORK}</label>
      </div>

      {accounts.current.length > 0 && (
        <div id="accounts" className="section">
          <h2>Accounts:</h2>
          {accounts.current.map((acct) => {
            const balance = balances.get(acct.userAddr);
            const explorerLink = makeExplorerUrl(
              NETWORK,
              "address",
              acct.userAddr,
            );
            return (
              <div className="account" key={acct.userAddr}>
                <div>
                  <label className={`provider ${acct.provider}`}>
                    {acct.provider}
                  </label>
                </div>
                <div>
                  Address:{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={explorerLink}
                  >
                    {shortenSuiAddress(acct.userAddr)}
                  </a>
                </div>
                <div>User ID: {acct.sub}</div>
                <div>
                  Balance:{" "}
                  {typeof balance === "undefined"
                    ? "(loading)"
                    : `${balance} SUI`}
                </div>
                <button
                  className={`btn-send bg-blue-500 px-10 py-2 text-white rounded-lg ${!balance ? "disabled" : ""}`}
                  disabled={!balance}
                  onClick={() => {
                    sendTransaction(acct);
                  }}
                >
                  Send transaction
                </button>
                {balance === 0 && (
                  <button
                    className="btn-faucet"
                    onClick={() => {
                      requestSuiFromFaucet(NETWORK, acct.userAddr);
                      setModalContent(
                        "💰 Requesting SUI from faucet. This will take a few seconds...",
                      );
                      setTimeout(() => {
                        setModalContent("");
                      }, 3000);
                    }}
                  >
                    Use faucet
                  </button>
                )}
                <hr />
              </div>
            );
          })}
        </div>
      )}

      <div className="section">
        <button
          className="btn-clear"
          onClick={() => {
            clearState();
          }}
        >
          🧨 CLEAR STATE
        </button>
      </div>
    </div>
  );
};
