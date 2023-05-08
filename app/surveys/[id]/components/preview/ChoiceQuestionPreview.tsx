import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Flex, Icon, TextInput, Text } from "@tremor/react";
import Checkbox from "../../../../components/checkbox/Checkbox";

type Question = {
    id: number;
    text: string;
    otherEnabled?: boolean;
    choices: Array<{
        text: string;
    }>
}

type ChoiceQuestionEntryPreview = {
    question: Question;
    order: number;
};

export default function ChoiceQuestionPreview(props: ChoiceQuestionEntryPreview) {

    const { question, order } = props

    return (
        <Flex className="flex-col gap-6">
            <Flex>
                <Text>{order}. {question.text}</Text>
            </Flex>
            <Flex className="flex-col gap-3 pl-6">
                {question.choices.map(choice => (
                    <Flex>
                        <Checkbox key={choice.text} label={choice.text} />
                    </Flex>
                ))}
                {question.otherEnabled && (
                    <Flex>
                        <TextInput placeholder="Inne.." disabled />
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}