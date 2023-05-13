interface QuestionBase {
    id: number,
    text: string,
    required: boolean
}

interface OpenQuestion {
    type: "open"
}


interface ChoiceQuestion {
    type: "choice"
    choices: Array<{
        text: string
    }>,
    otherEnabled: boolean,
    multipleAnswers: boolean
}

export type Question = QuestionBase & (OpenQuestion | ChoiceQuestion);