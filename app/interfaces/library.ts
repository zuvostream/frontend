export interface Project {
    id: number;
    title: string;
    visibility: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    username: string;
    Projects: Array<string>;
}
