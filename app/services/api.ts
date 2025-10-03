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
  return res.json();
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
  link: string,
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

// Get all Boards Learning
export async function getAllBoardLearning(token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}

// Get all Boards Freelance by UserId
export async function getAllBoardFreeLanceByUserId(UserId: number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsFreeLance/${UserId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}


// GET detail board freelance by id
export async function getBoardFreeLanceById(id: Number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsFreeLance/board/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil board FreeLance");
  return await res.json();
}

// UPDATE board freelance
export async function updateBoardFreeLance(
  id: number,
  data: any,
  token: string
) {
  const res = await fetch(`${BASE_URL}/boardsFreeLance/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update board FreeLance");
  return await res.json();
}

// get skills board freelance
export async function getBoardFreeLanceSkills(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsFreeLance/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil skills board FreeLance");
  return res.json();
}

// Get all Boards Learning by UserId
export async function getAllBoardLearningByuserId(UserId:number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/${UserId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}

// GET board learning by ID
export async function getBoardLearningById(id: Number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/board/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil board Learning");
  return res.json();
}

// UPDATE board learning
export async function updateBoardLearning(id: number, data: any, token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal update board Learning");
  return res.json();
}

// get skills board Learning
export async function getBoardLearningSkills(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil skills board Learning");
  return res.json();
}

// DELETE board learning
export async function deleteBoardLearning(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsLearning/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal delete board Learning");
  return res.json();
}

export async function deleteBoardFreeLance(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/boardsFreeLance/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal delete board Freelance");
  return res.json();
}

// create apply learning
export async function createApplicationLearning(data: {
  idUser: number;
  idBoardLearning: number;
  idTransaction: string;
  totalAmount: number;
}, token: string) {
  const res = await fetch(`${BASE_URL}/applications/learning`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal simpan apply board learning");
  }
  return res.json();
}

// cek sudah daftar atau belum board learning
export async function checkApplyBoardLearning(data: {
  idUser: number;
  idBoardLearning: number;
}, token: string) {
  const res = await fetch(`${BASE_URL}/applications/learning/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal simpan apply board learning");
  }
  return res.json();
}

// create apply FreeLance
export async function createApplicationFreeLance(data: {
  idUser: number;
  idBoardFreeLance: number;
  idUserCreated: number;
  message: string;
  subject: string;
}, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freelance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal simpan apply board freelance");
  }
  return res.json();
}

// cek sudah daftar atau belum board FreeLance
export async function checkApplyBoardFreeLance(data: {
  idUser: number;
  idBoardFreeLance: number;
}, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freelance/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal simpan apply board FreeLance");
  }
  return res.json();
}

// Get all Boards Apply Freelance
export async function getAllApplicationsFreeLanceByUser(idUser: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freelance/${idUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}

export async function getAllReplyFreeLanceByUser(idUser: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freelance/messages/reply/${idUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}

export async function getReplyFreeLanceById(idUser: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freelance/messages/detail/${idUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil Reply Free Lance");
  return res.json();
}

// Get all Boards Apply Learning
export async function getAllApplicationsLearningByUser(idUser: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/learning/${idUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil boards Free Lance");
  return res.json();
}

// get message
export async function getMessageFreeLanceFromApply(idUser: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freelance/messages/${idUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil Pesan");
  return res.json();
}

export async function getMessageLearningFromApply(idUser: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/learning/messages/${idUser}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil Pesan");
  return res.json();
}

export async function getMessageLearningFromById(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/learning/message/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil Pesan");
  return res.json();
}

export async function getMessageFreeLanceFromById(id: number, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freelance/message/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal ambil Pesan");
  return res.json();
}

// update board dan balasan pesan 
export async function updateBoardFeedBack(data: {
  id: number,
  idUserCreated: number;
  idBoardFreeLance: number;
  idUserTarget: number;
  status: string;
  subject: string;
}, token: string) {
  const res = await fetch(`${BASE_URL}/applications/freeLance/message/update/${data.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Gagal simpan Feedback apply board FreeLance");
  }
  return res.json();
}