const API_URL = import.meta.env.VITE_API_BASE_ENDPOINT;

const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Error en el login. Verifica tus credenciales.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la API de login:", error);
        throw error;
    }
};

const authAPI = {
    login
};

export default authAPI;