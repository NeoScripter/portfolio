import { signal } from '@preact/signals';

export type User = {
    id: number;
    name: string;
    email: string;
};

export const currentUser = signal<null | User>(null);
