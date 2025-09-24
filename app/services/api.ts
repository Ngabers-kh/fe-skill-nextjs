export const BASE_URL = "http://localhost:4001"; 

// Register
export async function registerUser(form: {
  name: string;
  email: string;
  password: string;
  address?: string;
  job?: string;
}) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) throw new Error("Register gagal");
  return res.json(); 
}

// Login
export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login gagal");
  return res.json(); // { token, user }
}

// Get all skills
export async function getAllSkills(token: string) {
  const res = await fetch(`${BASE_URL}/skills`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil skills");
  return res.json();
}

// Add skills to user
export async function addUserSkills(userId: number, skills: number[], token: string) {
  const res = await fetch(`${BASE_URL}/users/${userId}/skills`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ skills }), 
  });
  if (!res.ok) throw new Error("Gagal simpan skills");
  return res.json();
}

