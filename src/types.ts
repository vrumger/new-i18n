export interface Language {
    [key: string]: string | Language;
}

export type Variable = string | number;

export interface Variables {
    [key: string]: Variable;
}

export type Translation = string | null;
