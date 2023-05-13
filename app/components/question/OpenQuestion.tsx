import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Flex, Icon, Text, TextInput } from "@tremor/react"
import { useState } from "react"
import { OpenQuestion } from "../../../types/Question"
import Checkbox from "../checkbox/Checkbox"

interface OpenQuestionProps {
    question: OpenQuestion,
    editMode?: boolean,
    order: number
}


export default function OpenQuestion(props: OpenQuestionProps) {
    const { question, order, editMode } = props
    const [text, setText] = useState(question.text)

    const [required, setRequired] = useState(question.required || false)
    const [long, setLong] = useState(false)

    return (
        <Flex className="flex-col gap-6">

            {/* Question text */}
            {editMode ? (
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
            )}

            {/* Answer */}
            {editMode ? (
                <Flex>
                    <Icon icon={ArrowsUpDownIcon} className="invisible"></Icon>
                    <Text className="mr-3 invisible">{order}.</Text>
                    <TextInput placeholder="Wprowadź odpowiedź" disabled />
                    <Icon icon={TrashIcon} className="invisible"></Icon>
                </Flex>
            ) : (
                <Flex>
                    <TextInput placeholder="Wprowadź odpowiedź" />
                </Flex>
            )}


            {/* contols */}
            {editMode ? (
                <Flex justifyContent="end" className="gap-6">
                    <Checkbox label="Wymagane" value={required} onValueChange={setRequired}></Checkbox>
                    <Checkbox label="Długa odpowiedź" value={long} onValueChange={setLong}></Checkbox>
                </Flex>
            ) : (
                <></>
            )}
        </Flex >
    )
}