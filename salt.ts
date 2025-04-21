const encoder = new TextEncoder();
const _decoder = new TextDecoder();

type User = {
  email: string;
  password: string; // format: salt:hashedPasswordHex
};

const users: User[] = [];

function getRandomSalt(length = 16): Uint8Array {
  const salt = new Uint8Array(length);
  crypto.getRandomValues(salt);
  return salt;
}

async function hashPassword(
  password: string,
  salt: Uint8Array
): Promise<string> {
  const passwordBytes = encoder.encode(password);
  const combined = new Uint8Array(salt.length + passwordBytes.length);
  combined.set(salt);
  combined.set(passwordBytes, salt.length);

  const hashBuffer = await crypto.subtle.digest("SHA-512", combined);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function signup(email: string, password: string): Promise<User> {
  const salt = getRandomSalt();
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const hashedPassword = await hashPassword(password, salt);
  const user = { email, password: `${saltHex}:${hashedPassword}` };

  users.push(user);
  return user;
}

async function login(email: string, password: string): Promise<string> {
  const user = users.find((u) => u.email === email);
  if (!user) return "user not found";

  const [saltHex, storedHash] = user.password.split(":");
  const salt = new Uint8Array(
    saltHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );

  const attemptedHash = await hashPassword(password, salt);
  const isMatch = storedHash === attemptedHash;

  return isMatch ? "login success!" : "login fail!";
}

// Example usage
const newUser = await signup("alice@example.com", "supersecure123");
console.log("Signed up:", newUser);

const result = await login("alice@example.com", "supersecure123");
console.log("Login result:", result);
