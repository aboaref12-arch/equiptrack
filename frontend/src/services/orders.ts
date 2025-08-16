import { api } from "@/api/client";
import type { Order, ID } from "@/types";

export interface Paginated<T> { results: T[]; count: number; next?: string; previous?: string; }
export async function listOrders(params?: any): Promise<Paginated<Order>> {
  const { data } = await api.get("/orders/", { params });
  return data;
}
export async function getOrder(id: ID): Promise<Order> {
  const { data } = await api.get(`/orders/${id}/`);
  return data;
}
export async function createOrder(payload: Partial<Order>): Promise<Order> {
  const { data } = await api.post("/orders/", payload);
  return data;
}
export async function updateOrder(id: ID, payload: Partial<Order>): Promise<Order> {
  const { data } = await api.put(`/orders/${id}/`, payload);
  return data;
}
export async function deleteOrder(id: ID): Promise<void> {
  await api.delete(`/orders/${id}/`);
}
