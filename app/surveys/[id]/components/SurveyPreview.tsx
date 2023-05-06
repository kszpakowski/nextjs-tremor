"use client"

import { Text, TextInput, Flex } from "@tremor/react";
import { Survey } from "../../../../lib/api";

export default function SurveyPreview(props: { survey: Survey }) {
    const { survey } = props;
    const { questions } = survey.attributes

    return (
        <Flex className="flex-col gap-6">

            {questions && questions?.data.length !== 0 ?
                questions.data.map((q, i) => (
                    <div key={q.id} className="w-full">
                        <Text className="mb-3">{i + 1}. {q.attributes.questionText}</Text>
                        {q.attributes.type === 'open' ? (
                            <TextInput placeholder="Odpowiedź..."></TextInput>
                        ) : <></>}
                    </div>))
                : <Text>Brak pytań</Text>}

        </Flex>
    )
}