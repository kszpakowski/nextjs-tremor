interface QuestionBase {
    id: number,
    text: string,
    required: boolean
}

export type OpenQuestion = {
    type: "open"
} & QuestionBase


export type ChoiceQuestion = {
    type: "choice"
    choices: Array<{
        text: string
    }>,
    otherEnabled: boolean,
    multipleAnswers: boolean
} & QuestionBase

export type Question = OpenQuestion | ChoiceQuestion;