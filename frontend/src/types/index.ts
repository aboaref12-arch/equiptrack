export type ID = string | number;
export type OrderStatus = "Draft" | "In Progress" | "Completed" | "Delayed";
export type Priority = "Low" | "Medium" | "High";
export type ItemType = "AC" | "Compressor" | "Other" | "Additional";

export interface Store { id: ID; brand: string; name: string; city?: string; location?: string; email?: string; }
export interface Order {
  id: ID; dept?: string; pm_name?: string; region?: string; city?: string; store: ID;
  request_date?: string; status: OrderStatus; priority?: Priority; payment_status?: "Pending"|"Submitted"|"Paid"; created_by?: ID;
}
export interface OrderItem { id: ID; order: ID; type: ItemType; unit_model?: string; capacity?: string|number; voltage?: string|number; quantity: number; brand?: string; amount?: number; }
export interface ServiceRequest { id: ID; store: ID; order?: ID; invoice_no?: string; date?: string; status?: "Open"|"In Progress"|"Closed"; notes?: string; }
export interface Attachment { id: ID; order?: ID; item?: ID; type: "Invoice"|"Report"|"Completion"|"Other"; file_url: string; }
