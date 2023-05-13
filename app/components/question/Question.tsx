import { ArrowsUpDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Flex, Icon, Text, TextInput } from "@tremor/react";
import { useState } from "react";
import { Question as q } from "../../../types/Question"
import Checkbox from "../checkbox/Checkbox";

interface QuestionProps {
    question: q,
    editMode?: boolean,
    order: number
}

export default function Question(props: QuestionProps) {

    const { question, order, editMode } = props
    const [text, setText] = useState(question.text)

    const [otherEnabled, setOtherEnabled] = useState(false)
    const [multipleAnswer, setmultipleAnswer] = useState(false)
    const [required, setRequired] = useState(question.required || false)
    const [long, setLong] = useState(false)

    return (
        <Flex className="flex-col gap-6">
            {editMode ? (
                <>
                    <Flex>
                        <Icon icon={ArrowsUpDownIcon}></Icon>
                        <Text className="mr-3">{order}.</Text>
                        <TextInput className="" value={text} onChange={(e) => setText((e.target as HTMLInputElement).value)} />
                        <Icon icon={TrashIcon}></Icon>
                    </Flex>
                    {question.type === "open" ?
                        (
                            <Flex>
                                <Icon icon={ArrowsUpDownIcon} className="invisible"></Icon>
                                <Text className="mr-3 invisible">{order}.</Text>
                                <TextInput placeholder="Wprowadź odpowiedź" disabled />
                                <Icon icon={TrashIcon} className="invisible"></Icon>
                            </Flex>
                        ) : (
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
                        )}


                    {/* contols */}
                    {question.type === "open" ?
                        (
                            <Flex justifyContent="end" className="gap-6">
                                <Checkbox label="Wymagane" value={required} onValueChange={setRequired}></Checkbox>
                                <Checkbox label="Długa odpowiedź" value={long} onValueChange={setLong}></Checkbox>
                            </Flex>
                        ) : (
                            <Flex justifyContent="end" className="gap-6">
                                <Checkbox label="Pozwól na inne" value={otherEnabled} onValueChange={setOtherEnabled}></Checkbox>
                                <Checkbox label="Wiele odpowiedzi" value={multipleAnswer} onValueChange={setmultipleAnswer}></Checkbox>
                            </Flex>
                        )}
                </>
            ) : (
                <>
                    <Flex>
                        <Text>{order}. {question.text}</Text>
                    </Flex>
                    {question.type === "open" ?
                        (
                            <Flex>
                                <TextInput placeholder="Wprowadź odpowiedź" />
                            </Flex>
                        ) : (<Flex className="flex-col gap-3 pl-6">
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
                        </Flex>)}
                </>
            )}
        </Flex>
    )
}