import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Flex, Icon, TextInput, Text } from "@tremor/react";
import { useState } from "react";
import Checkbox from "../../../../components/checkbox/Checkbox";

type Question = {
    id: number;
    text: string;
    required?: boolean
}

type QuestionEntryProps = {
    question: Question;
    order: number;
};

export default function OpenQuestionEntry(props: QuestionEntryProps) {

    const { question, order } = props

    const [text, setText] = useState(question.text)
    const [required, setRequired] = useState(question.required || false)
    const [long, setLong] = useState(false)

    return (
        <Flex className="flex-col gap-6">
            <Flex>
                <Icon icon={ArrowsUpDownIcon}></Icon>
                <Text className="mr-3">{order}.</Text>
                <TextInput className="" value={text} onChange={(e) => setText((e.target as HTMLInputElement).value)} />
                <Icon icon={TrashIcon}></Icon>
            </Flex>
            <Flex>
                <Icon icon={ArrowsUpDownIcon} className="invisible"></Icon>Ū
                <Text className="mr-3 invisible">{order}.</Text>
                <TextInput placeholder="Wprowadź odpowiedź" disabled />
                <Icon icon={TrashIcon} className="invisible"></Icon>
            </Flex>
            <Flex justifyContent="end" className="gap-6">
                {/* contols */}
                <Checkbox label="Wymagane" value={required} onValueChange={setRequired}></Checkbox>
                <Checkbox label="Długa odpowiedź" value={long} onValueChange={setLong}></Checkbox>
            </Flex>
        </Flex>
    )
}