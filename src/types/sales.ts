export type Sales = {
    id: number;
    name: string;
    company: string;
    status: "low" | "medium" | "high";
    estimatedValue: number;
    accountOwner: string;
}