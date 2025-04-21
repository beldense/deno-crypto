import { signingKeyPair } from "./keypair.ts";

const message = "this data must be signed";
const encodedMessage = new TextEncoder().encode(message);

// Sign
const signature = await crypto.subtle.sign(
  { name: "RSASSA-PKCS1-v1_5" },
  signingKeyPair.privateKey,
  encodedMessage
);

// Verify
const isVerified = await crypto.subtle.verify(
  { name: "RSASSA-PKCS1-v1_5" },
  signingKeyPair.publicKey,
  signature,
  encodedMessage
);

// Output
const signatureHex = Array.from(new Uint8Array(signature))
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");

console.log("Signature (hex):", signatureHex);
console.log("Verified:", isVerified);
