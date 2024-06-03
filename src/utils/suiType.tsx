export type OpenIdProvider = "Google" | "Twitch" | "Facebook";

export type AccountData = {
  provider: OpenIdProvider;
  userAddr: string;
  zkProofs: any;
  ephemeralPrivateKey: string;
  userSalt: string;
  sub: string;
  aud: string;
  maxEpoch: number;
};
