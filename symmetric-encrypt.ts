const message = "i like turtles";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const key = await crypto.subtle.generateKey(
  { name: "AES-GCM", length: 256 },
  true,
  ["encrypt", "decrypt"]
);

const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM recommends 12 bytes

// Encrypt
const encrypted = await crypto.subtle.encrypt(
  { name: "AES-GCM", iv },
  key,
  encoder.encode(message)
);

// Decrypt
const decrypted = await crypto.subtle.decrypt(
  { name: "AES-GCM", iv },
  key,
  encrypted
);

// Output
const encryptedHex = Array.from(new Uint8Array(encrypted))
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");

console.log("Encrypted (hex):", encryptedHex);
console.log("Decrypted:", decoder.decode(decrypted));
