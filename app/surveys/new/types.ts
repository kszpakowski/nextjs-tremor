export type Question = {
    id: string;
    title: string;
    choices?: Array<string>;
    order: number;
}