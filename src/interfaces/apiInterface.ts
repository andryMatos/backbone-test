export interface UseFetchState<T> {
    state: "idle" | "loading" | "error" | "success";
    data: null | T;
    error: null | Error;
}

export interface Contactos {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
}

export interface ContactsResponse {
    count: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    results: Contactos[];
}

export interface ContactsRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
}

