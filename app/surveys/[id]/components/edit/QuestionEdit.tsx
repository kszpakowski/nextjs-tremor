import { Question } from "../../../../../lib/api"
import ChoiceQuestionEntry from "./ChoiceQuestionEntry"
import OpenQuestionEntry from "./OpenQuestionEntry"

type QuestionEditProps = {
    question: Question;
    order: number
}

export default function QuestionEdit(props: QuestionEditProps) {

    const { question, order } = props;
    if (question.attributes.type === "open") {
        return (
            <OpenQuestionEntry question={{
                id: question.id,
                text: question.attributes.questionText,
            }} order={order} />
        )
    }

    if (question.attributes.type === "single_choice") {
        return (
            <ChoiceQuestionEntry question={{
                id: question.id,
                text: question.attributes.questionText,
                choices: question.attributes.choices!.data.map(choice => ({
                    text: choice.attributes.choiceText
                }))
            }} order={order} />
        )
    }

    return <></>
}