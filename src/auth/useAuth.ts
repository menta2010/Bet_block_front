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