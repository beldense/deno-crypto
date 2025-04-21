import { encryptionKeyPair } from "./keypair.ts";

const message = "the british are coming!";
const encodedMessage = new TextEncoder().encode(message);

// Encrypt with public key
const encrypted = await crypto.subtle.encrypt(
  { name: "RSA-OAEP" },
  encryptionKeyPair.publicKey,
  encodedMessage
);

// Decrypt with private key
const decrypted = await crypto.subtle.decrypt(
  { name: "RSA-OAEP" },
  encryptionKeyPair.privateKey,
  encrypted
);

const decryptedMessage = new TextDecoder().decode(decrypted);

// Output
console.log(
  "Encrypted (hex):",
  Array.from(new Uint8Array(encrypted))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
);

console.log("Decrypted:", decryptedMessage);
