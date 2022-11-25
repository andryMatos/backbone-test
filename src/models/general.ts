export interface UseFetchState<T> {
    state: "idle" | "loading" | "error" | "success";
    data: null | T;
    error: null | Error;
}

export interface Notify {
    isOpen: boolean,
    message: string,
    severity: 'error' | 'warning' | 'success'
}
