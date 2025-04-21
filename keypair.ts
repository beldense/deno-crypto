// Generate key pair for RSA-OAEP (encryption/decryption)
const encryptionKeyPair = await crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"]
);

// Generate key pair for RSASSA-PKCS1-v1_5 (signing/verification)
const signingKeyPair = await crypto.subtle.generateKey(
  {
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["sign", "verify"]
);

// Optional: Export keys as PEM (for display or saving)
async function exportKey(
  key: CryptoKey,
  type: "public" | "private"
): Promise<string> {
  const format = type === "public" ? "spki" : "pkcs8";
  const exported = await crypto.subtle.exportKey(format, key);
  const b64 = btoa(String.fromCharCode(...new Uint8Array(exported)));
  const label = type === "public" ? "PUBLIC KEY" : "PRIVATE KEY";
  return `-----BEGIN ${label}-----\n${b64
    .match(/.{1,64}/g)
    ?.join("\n")}\n-----END ${label}-----`;
}

// Optional logging
console.log(
  "Encryption Public Key:\n",
  await exportKey(encryptionKeyPair.publicKey, "public")
);
console.log(
  "Signing Public Key:\n",
  await exportKey(signingKeyPair.publicKey, "public")
);

export {
  encryptionKeyPair,
  signingKeyPair,
  exportKey, // optional utility if you need to save/export later
};
