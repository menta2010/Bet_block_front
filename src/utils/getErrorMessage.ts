// src/utils/getErrorMessage.ts
import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (!error) return 'Erro desconhecido.';

  // AxiosError do backend
  if (typeof error === 'object' && error !== null && 'isAxiosError' in error) {
    const axiosError = error as AxiosError<any>;

    if (axiosError.response?.data) {
      const data = axiosError.response.data;
      if (typeof data.detail === 'string') return data.detail;

      if (Array.isArray(data.detail)) {
        return data.detail[0]?.msg || 'Dados inválidos.';
      }
    }

    if (axiosError.code === 'ECONNABORTED') return 'Tempo de resposta excedido.';
    return 'Erro de conexão com o servidor.';
  }

  // Erro comum
  if (error instanceof Error) return error.message;

  return String(error);
}
