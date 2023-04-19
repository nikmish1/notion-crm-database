// export type SalesResponse = {
//     object: string;
//     results: Result[];
//     next_cursor: null;
//     has_more: boolean;
//     type: string;
//     page: Page;
//     developer_survey: string;
// }

// export type Page = {
// }

// export type Result = {
//     object: string;
//     id: string;
//     created_time: Date;
//     last_edited_time: Date;
//     created_by: TedBy;
//     last_edited_by: TedBy;
//     cover: null;
//     icon: null;
//     parent: Parent;
//     archived: boolean;
//     properties: Properties;
//     url: string;
// }

// export type TedBy = {
//     object: Object;
//     id: string;
// }

// export enum Object {
//     User = "user",
// }

// export type Parent = {
//     type: string;
//     database_id: string;
// }

// export type Properties = {
//     estimated_value: EstimatedValue;
//     name: Company;
//     status: Status;
//     account_owner: AccountOwner;
//     company: Company;
//     id: ID;
// }

// export type AccountOwner = {
//     id: string;
//     type: string;
//     created_by: TedBy;
// }

// export type Company = {
//     id: string;
//     type: string;
//     rich_text: RichText[];
// }

// export type RichText = {
//     type: Type;
//     text: Text;
//     annotations: Annotations;
//     plain_text: string;
//     href: null;
// }

// export type Annotations = {
//     bold: boolean;
//     italic: boolean;
//     strikethrough: boolean;
//     underline: boolean;
//     code: boolean;
//     color: Color;
// }

// export enum Color {
//     Default = "default",
// }

// export type Text = {
//     content: string;
//     link: null;
// }

// export enum Type {
//     Text = "text",
// }

// export type EstimatedValue = {
//     id: string;
//     type: string;
//     number: number;
// }

// export type ID = {
//     id: string;
//     type: string;
//     title: RichText[];
// }

// export type Status = {
//     id: string;
//     type: string;
//     select: Select;
// }

// export type Select = {
//     id: string;
//     name: string;
//     color: string;
// }

export default {}
