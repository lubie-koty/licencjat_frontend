export interface AuthenticationDTO {
    isSuccessful: boolean;
    errorMessage: string;
    token: string;
}

export interface ActionResponseDTO {
    isSuccessful: boolean;
    errors: string[];
}