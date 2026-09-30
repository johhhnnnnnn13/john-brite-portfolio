import type { Project } from '../content/portfolio';

type ProjectSummary = Pick<Project, 'slug' | 'title' | 'eyebrow' | 'status' | 'summary' | 'problem' | 'role'>;

const baseUrl = import.meta.env.VITE_API_URL ?? '';
export const apiEnabled = Boolean(import.meta.env.VITE_API_URL);

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const api = {
  projects: () => request<ProjectSummary[]>('/api/v1/projects'),
  contact: (body: Record<string, string>) => request<{ accepted: boolean }>('/api/v1/contact', { method: 'POST', body: JSON.stringify(body) }),
};
