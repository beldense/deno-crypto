import { createSign, createVerify } from "node:crypto";
import { privateKey, publicKey } from "./keypair.ts";

const message = "this data must be signed";

// SIGN

const signer = createSign("rsa-sha256");

signer.update(message);

const signature = signer.sign(privateKey, "hex");

// VERIFY

const verifier = createVerify("rsa-sha256");

verifier.update(message);

const isVerified = verifier.verify(publicKey, signature, "hex");

console.log("Signature:", signature);
console.log("Verified:", isVerified);
