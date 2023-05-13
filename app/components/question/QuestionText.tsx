import { useState } from "react";
import { Question } from "../../../types/Question";
import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Icon, Text, TextInput, Flex } from "@tremor/react";

interface QuestionTextProps {
    question: Question,
    editMode?: boolean
    order: number
}

export default function QuestionText(props: QuestionTextProps) {
    const { question, editMode, order } = props;

    const [text, setText] = useState(question.text)

    return editMode ? (
        <Flex>
            <Icon icon={ArrowsUpDownIcon}></Icon>
            <Text className="mr-3">{order}.</Text>
            <TextInput className="" value={text} onChange={(e) => setText((e.target as HTMLInputElement).value)} />
            <Icon icon={TrashIcon}></Icon>
        </Flex>
    ) : (
        <Flex>
            <Text>{order}. {question.text}</Text>
        </Flex>
    )
}