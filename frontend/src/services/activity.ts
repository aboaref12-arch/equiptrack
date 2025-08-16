
import { api } from "@/api/client";
export interface Activity {
  id: number; action_time: string; user: string;
  content_type: number | string; object_repr: string; change_message: string; action_flag: number;
}
export async function listActivity(params?: any): Promise<{count:number;results:Activity[]}> {
  const { data } = await api.get("/activity/", { params }); return data;
}
