
import { api } from "@/api/client";
import type { ID } from "@/types";
export interface Lookup { id: ID; category: string; value: string; }
export async function listLookups(params?: any): Promise<{count:number;results:Lookup[]}> { const { data } = await api.get("/lookups/", { params }); return data; }
