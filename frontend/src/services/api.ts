export async function getUserProfile() {
  const token = localStorage.getItem('token');

  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch('/api/user/profile', {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao buscar o perfil do usuário: ${errorText}`);
  }

  return await response.json();
}
