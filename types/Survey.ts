import { Question } from "./Question"

export type Survey = {
    id: number,
    name: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
    questions: Array<Question>
}