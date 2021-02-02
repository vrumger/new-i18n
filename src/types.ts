export interface FolderOptions {
    folder: string;
    languages: string[];
    fallback?: string;
}

export interface LanguageMapOptions {
    languages: LanguageMap;
    fallback?: string;
}

export type Options = FolderOptions | LanguageMapOptions;

export interface Language {
    [key: string]: string | Language;
}

export interface LanguageMap {
    [key: string]: Language;
}

export type Variable = string | number;

export interface Variables {
    [key: string]: Variable;
}

export type Translation = string | null;
