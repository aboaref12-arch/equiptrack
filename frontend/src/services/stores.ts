
import { api } from "@/api/client";
import type { Store, ID } from "@/types";
export interface Paginated<T> { count: number; next?: string; previous?: string; results: T[]; }
export async function listStores(params?: any): Promise<Paginated<Store>> { const { data } = await api.get("/stores/", { params }); return data; }
export async function getStore(id: ID): Promise<Store> { const { data } = await api.get(`/stores/${id}/`); return data; }
export async function createStore(payload: Partial<Store>): Promise<Store> { const { data } = await api.post("/stores/", payload); return data; }
export async function updateStore(id: ID, payload: Partial<Store>): Promise<Store> { const { data } = await api.put(`/stores/${id}/`, payload); return data; }
export async function deleteStore(id: ID): Promise<void> { await api.delete(`/stores/${id}/`); }
