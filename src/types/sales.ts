export type Sales = {
    id: number;
    name: string;
    company: string;
    status: "low" | "medium" | "high";
    estimated_value: number;
    account_owner: string;
}