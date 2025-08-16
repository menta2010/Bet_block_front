// src/auth/userAuth.ts
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { api } from "@src/api/client";

// Hook
export const useAuth = () => useContext(AuthContext);

// ✅ LOGIN: enviar form-encoded com campos OAuth2
export async function loginApi(email: string, senha: string) {
  const form = new URLSearchParams();
  form.append('username', email);
  form.append('password', senha);

  const { data } = await api.post('/auth/login', form, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    timeout: 10000,
  });

  return data as { access_token: string; token_type?: string };
}

// CADASTRO (já certo em /auth/register)
export async function registerApi(nome: string, email: string, senha: string) {
  const { data } = await api.post('/auth/register', { nome, email, senha }, { timeout: 10000 });
  return data;
}


// --- Enviar código de recuperação ---
export async function requestPasswordResetCode(email: string): Promise<void> {
  await api.post(
    "/auth/request-password-reset-code",
    { email },
    { timeout: 10000, headers: { "Content-Type": "application/json" } }
  );
  // se a API retornar 4xx/5xx, o axios lança; quem chama trata via getErrorMessage
}

// --- Redefinir senha com código ---
export async function resetPassword(payload: {
  email: string;
  code: string;
  nova_senha: string;
}): Promise<void> {
  await api.post(
    "/auth/reset-password",
    payload,
    { timeout: 10000, headers: { "Content-Type": "application/json" } }
  );
}
