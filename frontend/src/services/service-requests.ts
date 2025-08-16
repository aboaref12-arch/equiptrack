
import { api } from "@/api/client";
import type { ServiceRequest, ID } from "@/types";
export interface Paginated<T> { count: number; results: T[]; next?: string; previous?: string; }
export async function listServiceRequests(params?: any): Promise<Paginated<ServiceRequest>> { const { data } = await api.get("/service-requests/", { params }); return data; }
export async function createServiceRequest(payload: Partial<ServiceRequest>): Promise<ServiceRequest> { const { data } = await api.post("/service-requests/", payload); return data; }
export async function updateServiceRequest(id: ID, payload: Partial<ServiceRequest>): Promise<ServiceRequest> { const { data } = await api.put(`/service-requests/${id}/`, payload); return data; }
export async function deleteServiceRequest(id: ID): Promise<void> { await api.delete(`/service-requests/${id}/`); }
