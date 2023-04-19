export type Sales = {
    estimated_value: EstimatedValue;
    name: Company;
    status: Status;
    account_owner: AccountOwner;
    company: Company;
    id: ID;
}

type AccountOwner = {
    id: string;
    type: string;
    created_by: CreatedBy;
}

type CreatedBy = {
    object: string;
    id: string;
}

type Company = {
    id: string;
    type: string;
    rich_text: RichText[];
}

type RichText = {
    type: Type;
    text: Text;
    annotations: Annotations;
    plain_text: string;
    href: null;
}

type Annotations = {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: Color;
}

enum Color {
    Default = "default",
}

type Text = {
    content: string;
    link: null;
}

enum Type {
    Text = "text",
}

type EstimatedValue = {
    id: string;
    type: string;
    number: number;
}

type ID = {
    id: string;
    type: string;
    title: RichText[];
}

type Status = {
    id: string;
    type: string;
    select: Select;
}

type Select = {
    id: string;
    name: string;
    color: string;
}


export type Column = {
    Header: string;
    accessor: string;
}

type SortPayload = [{
    property: string,
    direction: 'ascending' | 'descending'
}]

export type NotionPayload = {
    sorts?: SortPayload,
    filter?: {}
}