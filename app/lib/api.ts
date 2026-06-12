//centraliza todas las llamadas al back en vez de hacer un fetch a la api en cada componente. una vez aca lo importo a cualq lado

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    return res.json();
  },

  register: async (email: string, firstname: string, password: string, role: string) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstname, password, role }),
    });
    if (!res.ok) throw new Error("Error al registrarse");
    return res.json();
  },
};