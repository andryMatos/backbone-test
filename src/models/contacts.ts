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

export interface Contacto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    createdAt: string;
    updatedAt: string;
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
