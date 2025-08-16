
import { api } from "@/api/client";
import type { Attachment, ID } from "@/types";
export interface Paginated<T> { count: number; results: T[]; next?: string; previous?: string; }
export async function listAttachments(params?: any): Promise<Paginated<Attachment>> { const { data } = await api.get("/attachments/", { params }); return data; }
export async function createAttachment(payload: Partial<Attachment>): Promise<Attachment> { const { data } = await api.post("/attachments/", payload); return data; }
export async function deleteAttachment(id: ID): Promise<void> { await api.delete(`/attachments/${id}/`); }
