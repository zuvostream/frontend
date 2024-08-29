export interface Project {
    Id: number;
    Title: string;
    Creator: string;
    Visibility: string;
    Image: string;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface User {
    id: string;
    username: string;
    Projects: Array<string>;
}
