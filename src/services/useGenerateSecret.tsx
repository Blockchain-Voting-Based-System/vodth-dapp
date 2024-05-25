import SHA256 from "crypto-js/sha256";

export function useGenerateSecret(key: string): string {
  return SHA256(key + import.meta.env.VITE_EMAIL_SECRET_SALT).toString();
}
