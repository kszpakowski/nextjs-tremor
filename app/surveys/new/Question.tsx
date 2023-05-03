'use client';

import { ArrowUpCircleIcon, ArrowDownCircleIcon, MinusCircleIcon, PencilIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Flex, Toggle, ToggleItem, Icon, Text, TextInput } from "@tremor/react";

type Question = {
    id: string;
    title: string;
    choices?: Array<string>;
    order:number;
}

type QuestionProps = {
    question: Question;
    onEdit?: (question: Question) => void;
    onDelete?: (question: Question) => void;
    onOrderUp?: (question: Question) => void;
    onOrderDown?: (question: Question) => void;
}

export default function Question(props: QuestionProps) {
    const { question, onEdit, onOrderDown, onOrderUp, onDelete } = props;
    return (
        <Flex alignItems="start">
            <div>
                <Text className="mb-3">{question.title}</Text>
                {question.choices && (
                    <Toggle onValueChange={(value) => console.log(value)}>
                        {question.choices.map((choice, i) => (
                            <ToggleItem value={`${i + 1}`} text={choice} key={i} />
                        ))}
                    </Toggle>
                )}
                {!question.choices && (
                    <TextInput placeholder="Odpowiedź..." />
                )}

            </div>
            <div>
                <Icon size="sm"
                    icon={EllipsisHorizontalCircleIcon}
                    className="cursor-pointer text-blue-300 hover:text-blue-600 ease-in-out duration-300"
                    onClick={() => props.onEdit && props.onEdit(question)} />
                <Icon size="sm"
                    icon={ArrowUpCircleIcon}
                    className="cursor-pointer text-blue-300 hover:text-blue-600 ease-in-out duration-300"
                    onClick={() => props.onOrderUp && props.onOrderUp(question)} />
                <Icon size="sm"
                    icon={ArrowDownCircleIcon}
                    className="cursor-pointer text-blue-300 hover:text-blue-600 ease-in-out duration-300"
                    onClick={() => props.onOrderDown && props.onOrderDown(question)} />
                <Icon size="sm"
                    icon={MinusCircleIcon}
                    className="cursor-pointer text-red-300 hover:text-red-600 ease-in-out duration-300"
                    onClick={() => props.onDelete && props.onDelete(question)} />
            </div>
        </Flex>
    )
}