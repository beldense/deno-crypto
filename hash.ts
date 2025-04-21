const encoder = new TextEncoder();

async function hash(input: string): Promise<string> {
  const data = encoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Example usage
const password = "hello-world!";
const hash1 = await hash(password);
console.log(hash1);
