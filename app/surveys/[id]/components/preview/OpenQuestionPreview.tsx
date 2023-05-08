import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Flex, TextInput, Text, Icon } from "@tremor/react";

type Question = {
    id: number;
    text: string;
    required?: boolean
}

type OpenQuestionPreviewProps = {
    question: Question;
    order: number;
};

export default function OpenQuestionPreview(props: OpenQuestionPreviewProps) {

    const { question, order } = props

    return (
        <Flex className="flex-col gap-6">
            <Flex>
                <Text>{order}. {question.text}</Text>
            </Flex>
            <Flex>
                <TextInput placeholder="Wprowadź odpowiedź" />
            </Flex>
        </Flex>
    )
}
