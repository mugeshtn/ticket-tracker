export interface ITicket {
    title: string
    description: string
    priority: "High" | "Low" | "Medium"
    category: "Billing" | "Technical" | "Feature Request" | "Others";
    dateOfIssue: string
    id: string
    phone: string
    contactEmail:string
    contact: string
    urgent: boolean
    file: string
    userId: string
}


export const priority = {
    High: "danger",
    Medium: "warning",
    Low: "primary",
} as const;

export type priorityKey = keyof typeof priority;