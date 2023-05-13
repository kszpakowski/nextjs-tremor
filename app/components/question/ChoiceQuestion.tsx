import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Flex, Icon, Text, TextInput } from "@tremor/react"
import { ChoiceQuestion } from "../../../types/Question"
import Checkbox from "../checkbox/Checkbox"
import { useState } from "react"

interface ChoiceQuestionProps {
    question: ChoiceQuestion,
    editMode?: boolean,
    order: number
}


export default function ChoiceQuestion(props: ChoiceQuestionProps) {

    const { question, order, editMode } = props
    const [text, setText] = useState(question.text)
    const [otherEnabled, setOtherEnabled] = useState(false)
    const [multipleAnswer, setmultipleAnswer] = useState(false)

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

            {/* Choices */}
            {editMode ? (
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
            ) : (
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
            )}


            {/* Contols */}
            {editMode ? (
                <Flex justifyContent="end" className="gap-6">
                    <Checkbox label="Pozwól na inne" value={otherEnabled} onValueChange={setOtherEnabled}></Checkbox>
                    <Checkbox label="Wiele odpowiedzi" value={multipleAnswer} onValueChange={setmultipleAnswer}></Checkbox>
                </Flex>
            ) : (
                <></>
            )}
        </Flex >)
}