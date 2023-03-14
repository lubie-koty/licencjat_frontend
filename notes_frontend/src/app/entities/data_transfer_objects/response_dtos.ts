export class AuthenticationDTO {
    isSuccessful?: boolean;
    errorMessage?: string;
    token?: string;
}

export class ActionResponseDTO {
    isSuccessful?: boolean;
    errors?: string[];
}