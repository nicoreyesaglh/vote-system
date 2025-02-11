const API_URL = import.meta.env.VITE_API_BASE_ENDPOINT;
const token = localStorage.getItem("token");

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la API de login:", error);
    throw error;
  }
};

const modifyPassword = async (email, oldPassword, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/modifyPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, oldPassword, newPassword }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la API de login:", error);
    throw error;
  }
};

const authAPI = {
  login,
  modifyPassword,
};

export default authAPI;
