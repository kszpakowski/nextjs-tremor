import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Flex, Icon, Text } from "@tremor/react";
import { useState } from "react";

type CheckboxProps = {
    label?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
}

export default function Checkbox(props: CheckboxProps) {
    const [value, setValue] = useState(props.value || false)

    const onValueChange = () => {
        const newValue = !value;
        setValue(newValue);
        props.onValueChange && props.onValueChange(newValue)
    }
    return (
        <Flex justifyContent="start" onClick={onValueChange} className="cursor-pointer select-none flex-initial w-auto">
            <Icon icon={value ? CheckCircleIcon : XCircleIcon}></Icon>
            <Text>{props.label}</Text>
        </Flex>
    )
}