export interface NoteDTO {
    title: string;
    content: string;
}

export interface UserRegisterDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}