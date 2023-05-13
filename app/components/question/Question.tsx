import { Question as QuestionType } from "../../../types/Question"
import OpenQuestion from "./OpenQuestion";
import ChoiceQuestion from "./ChoiceQuestion";
import { assertExhaustive } from "../../../lib/assertions";

interface QuestionProps {
    question: QuestionType,
    editMode?: boolean,
    order: number
}

export default function Question(props: QuestionProps) {

    const { question, order, editMode } = props

    switch (question.type) {
        case "open": return (<OpenQuestion question={question} order={order} editMode={editMode} />)
        case "choice": return (<ChoiceQuestion question={question} order={order} editMode={editMode} />)
        default: assertExhaustive(question);
    }
}

