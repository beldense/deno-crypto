import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { Buffer } from "node:buffer";

type User = {
  email: string;
  password: string; // format: salt:hashedPassword
};

// Example in-memory user storage
const users: User[] = [];

function signup(email: string, password: string) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");

  const user = { email, password: `${salt}:${hashedPassword}` };

  users.push(user);
  return user;
}

function login(email: string, password: string) {
  const user = users.find((v) => v.email === email);
  if (!user) return "user not found";

  const [salt, key] = user.password.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);

  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  if (match) {
    return "login success!";
  } else {
    return "login fail!";
  }
}

// Example usage
const newUser = signup("alice@example.com", "supersecure123");
console.log("Signed up:", newUser);

const result = login("alice@example.com", "supersecure123");
console.log("Login result:", result);
