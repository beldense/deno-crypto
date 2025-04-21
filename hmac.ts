const encoder = new TextEncoder();

async function createHMAC(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(message)
  );

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Example usage
const key1 = "super-secret!";
const key2 = "other-password";
const message = "boo ghost";

const hmac1 = await createHMAC(message, key1);
console.log(hmac1);

const hmac2 = await createHMAC(message, key2);
console.log(hmac2);
