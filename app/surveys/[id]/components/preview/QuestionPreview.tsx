import { Question } from "../../../../../lib/api"
import ChoiceQuestionPreview from "./ChoiceQuestionPreview";
import OpenQuestionPreview from "./OpenQuestionPreview";

type QuestionEditProps = {
    question: Question;
    order: number;
}

export default function QuestionPreview(props: QuestionEditProps) {

    const { question, order } = props;
    if (question.attributes.type === "open") {
        return (
            <OpenQuestionPreview question={{
                id: question.id,
                text: question.attributes.questionText,
            }} order={order}/>
        )
    }

    if (question.attributes.type === "single_choice") {
        return (
            <ChoiceQuestionPreview question={{
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