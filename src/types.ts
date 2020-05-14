export interface Language {
    [key: string]: string | Language;
}

export interface Variables {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export type Translation = string | null;
