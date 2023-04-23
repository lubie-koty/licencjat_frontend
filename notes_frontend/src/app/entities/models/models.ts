export interface Note {
    id: number;
    title: string;
    content: string;
    created: Date;
    updated: Date;
}

export interface User {
    firstName: string;
    lastName: string;
}