export interface Notify {
    isOpen: boolean,
    message: string,
    severity: 'error' | 'warning' | 'success'
}
