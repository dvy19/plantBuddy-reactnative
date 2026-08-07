export interface RegisterRequest {
    email: string;
    password: string;
    role:string;
}

export interface RegisterResponse {
    message: string;
    tokens: {
        access: string;
        refresh: string;
    };
    role:string;
}


export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    tokens: {
        access: string;
        refresh: string;
    };
    role:string;
}
