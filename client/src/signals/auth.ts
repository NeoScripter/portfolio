import { signal } from '@preact/signals';

export type User = {
    id: number;
    name: string;
    email: string;
    expires_at: number;
};

export const currentUser = signal<null | User>(null);
