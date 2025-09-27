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

export async function getUser(userId: number, token: string) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil User");
  return res.json();
}

export async function getUserSkill(userId: number, token: string) {
  const res = await fetch(`${BASE_URL}/users/${userId}/skills`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil User");
  return res.json();
}

export async function updateUser(userId: number, token: string, data: any) {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PATCH", // gunakan PATCH untuk update sebagian data
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal update User");
  }

  return res.json();
}

// create board freelance
export async function createBoardFreeLance(data: {
  idUser: number;
  title: string;
  description: string;
  price: number;
  quota: number;
  startDate: string;
  endDate: string;
  skills: number[];
}, token: string) {
  const res = await fetch(`${BASE_URL}/boardsFreeLance/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal simpan board freelance");
  }

  return res.json();
}

// create board learning
export async function createBoardLearning(data: {
  idUser: number;
  title: string;
  description: string;
  price: number;
  date: string;
  startTime: string;
  endTime: string;
  skills: number[];
}, token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal simpan board learning");
  }

  return res.json();
}

// Get all Boards Freelance
export async function getAllBoardFreeLance(token: string) {
  const res = await fetch(`${BASE_URL}/boardsFreeLance/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}

export async function getAllBoardLearning(token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}
