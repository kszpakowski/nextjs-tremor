'use client';

import { ArrowUpCircleIcon, ArrowDownCircleIcon, MinusCircleIcon, PencilIcon, EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Flex, Toggle, ToggleItem, Icon, Text, TextInput } from "@tremor/react";

type QuestionProps = {
    id: string;
    title: string;
    choices?: Array<string>;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onOrderUp?: (id: string) => void;
    onOrderDown?: (id: string) => void;
}

export default function Question(props: QuestionProps) {
    return (
        <Flex alignItems="start">
            <div>
                <Text className="mb-3">{props.title}</Text>
                {props.choices && (
                    <Toggle onValueChange={(value) => console.log(value)}>
                        {props.choices.map((choice, i) => (
                            <ToggleItem value={`${i + 1}`} text={choice} key={i} />
                        ))}
                    </Toggle>
                )}
                {!props.choices && (
                    <TextInput placeholder="Odpowiedź..." />
                )}

            </div>
            <div>
                <Icon size="sm"
                    icon={EllipsisHorizontalCircleIcon}
                    className="cursor-pointer text-blue-300 hover:text-blue-600 ease-in-out duration-300"
                    onClick={() => props.onEdit && props.onEdit(props.id)} />
                <Icon size="sm"
                    icon={ArrowUpCircleIcon}
                    className="cursor-pointer text-blue-300 hover:text-blue-600 ease-in-out duration-300"
                    onClick={() => props.onOrderUp && props.onOrderUp(props.id)} />
                <Icon size="sm"
                    icon={ArrowDownCircleIcon}
                    className="cursor-pointer text-blue-300 hover:text-blue-600 ease-in-out duration-300"
                    onClick={() => props.onOrderDown && props.onOrderDown(props.id)} />
                <Icon size="sm"
                    icon={MinusCircleIcon}
                    className="cursor-pointer text-red-300 hover:text-red-600 ease-in-out duration-300"
                    onClick={() => props.onDelete && props.onDelete(props.id)} />
            </div>
        </Flex>
    )
}