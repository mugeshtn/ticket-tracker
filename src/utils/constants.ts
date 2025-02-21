import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const ticketSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    priority: z.enum(["High", "Low", "Medium"]),
    category: z.enum(["Billing", "Technical", "Feature Request", "Others"]),
    status: z.enum(["New", "Assigned", "Resolved", "Closed"]),
    contactEmail: z.string(),
    file: z.string().optional(),
    userId: z.string().optional(),
    createdAt: z.string()
})
export type ITicket = z.infer<typeof ticketSchema>

export const formTicketSchema = ticketSchema.omit({ id: true })
export type IForm = z.infer<typeof formTicketSchema>


export const priority = {
    High: "danger",
    Medium: "warning",
    Low: "secondary",
} as const;
export const Estatus = {
    New: "primary",
    Assigned: "warning",
    Resolved: "success",
    Closed: "default"
} as const;

export type priorityKey = keyof typeof priority;

export const formatDate = (dateString: string | undefined): string | null => {
    if (typeof dateString === "string") {
        const fullDate = new Date(dateString).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })

        return fullDate
    } else {
        return null
    }
}