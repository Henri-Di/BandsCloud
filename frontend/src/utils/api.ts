const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

type RequestOptions = {
  method?: string;
  body?: any;
  headers?: HeadersInit;
};

export async function apiFetch<T = any>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (method !== 'GET' && body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Erro ${response.status}`);
  }

  if (response.status === 204) {
    // No Content
    return null as any;
  }

  return response.json();
}
