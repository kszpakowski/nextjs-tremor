"use client"

import { MagnifyingGlassIcon, CheckIcon, PlayIcon, StopIcon, ArchiveBoxIcon, ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { Card, Flex, TextInput, Toggle, ToggleItem } from "@tremor/react";

//https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication
export default function SurveyListControls(props: { color: 'red' | 'blue' | 'amber' }) {
    const { color } = props;
    return (
        <Card className='space-y-3'>
            <Flex className="space-x-3 truncate">
                <TextInput icon={MagnifyingGlassIcon} color={color} placeholder="Szukaj..." />
            </Flex>
            <Flex
                alignItems='baseline'>
                <Toggle defaultValue="all" color={color} onValueChange={console.log}>
                    <ToggleItem value="all" text="Wszystkie" icon={CheckIcon} />
                    <ToggleItem value="active" text="Aktywne" icon={PlayIcon} />
                    <ToggleItem value="completed" text="Zakończone" icon={StopIcon} />
                    <ToggleItem value="archived" text="Zarchiwizowane" icon={ArchiveBoxIcon} />
                </Toggle>
                <Toggle defaultValue="last_updated" color={color} onValueChange={console.log}>
                    <ToggleItem value="last_updated" text="Ostatnio zaktualizowane" icon={ArrowDownCircleIcon} />
                    <ToggleItem value="last_finished" text="Ostatnio zakończone" />
                </Toggle>
            </Flex>
        </Card>
    )
}