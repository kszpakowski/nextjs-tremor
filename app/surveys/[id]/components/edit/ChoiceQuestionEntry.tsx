import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Flex, Icon, TextInput, Text } from "@tremor/react";
import { useState } from "react";
import Checkbox from "../../../../components/checkbox/Checkbox";

type Question = {
    id: number;
    text: string;
    otherEnabled?: boolean;
    choices: Array<{
        text: string;
    }>
}

type QuestionEntryProps = {
    question: Question;
    order: number;
};

export default function OpenQuestionEntry(props: QuestionEntryProps) {

    const { question, order } = props

    const [text, setText] = useState(question.text)
    const [otherEnabled, setOtherEnabled] = useState(question.otherEnabled || false)
    const [multipleAnswer, setmultipleAnswer] = useState(false)
    // const [otherText, setOther] = useState(question.otherText)

    return (
        <Flex className="flex-col gap-6">
            <Flex>
                <Icon icon={ArrowsUpDownIcon}></Icon>
                <Text className="mr-3">{order}.</Text>
                <TextInput className="" value={text} onChange={(e) => setText((e.target as HTMLInputElement).value)} />
                <Icon icon={TrashIcon}></Icon>
            </Flex>
            <Flex className="flex-col gap-3 pl-6">
                {question.choices.map(choice => (
                    <Flex>
                        <Icon icon={ArrowsUpDownIcon}></Icon>
                        <TextInput value={choice.text} key={choice.text} />
                        <Icon icon={TrashIcon} color="red"></Icon>
                    </Flex>
                ))}
                {otherEnabled && (
                    <Flex>
                        <Icon icon={ArrowsUpDownIcon} className="invisible"></Icon>
                        <TextInput placeholder="Inne.." disabled />
                        <Icon icon={TrashIcon} className="invisible"></Icon>
                    </Flex>
                )}
            </Flex>
            <Flex justifyContent="end" className="gap-6">
                {/* contols */}
                <Checkbox label="Pozwól na inne" value={otherEnabled} onValueChange={setOtherEnabled}></Checkbox>
                <Checkbox label="Wiele odpowiedzi" value={multipleAnswer} onValueChange={setmultipleAnswer}></Checkbox>
            </Flex>
        </Flex>
    )
}