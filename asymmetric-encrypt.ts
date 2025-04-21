import { publicEncrypt, privateDecrypt } from "node:crypto";
import { publicKey, privateKey } from "./keypair.ts";
import { Buffer } from "node:buffer";

const message = "the british are coming!";

const encryptedData = publicEncrypt(publicKey, Buffer.from(message));

console.log(encryptedData.toString("hex"));

const decryptedData = privateDecrypt(privateKey, encryptedData);

console.log(decryptedData.toString("utf8"));
