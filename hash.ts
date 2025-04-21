import { createHash } from "node:crypto";

// Create a string hash

function hash(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

// Compare two hashed passwords

const password = "hello-world!";
const hash1 = hash(password);
console.log(hash1);
