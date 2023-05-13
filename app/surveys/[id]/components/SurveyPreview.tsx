"use client"

import { Text, Flex } from "@tremor/react";
import Question from "../../../components/question/Question";
import { Survey } from "../../../../types/Survey";

export default function SurveyPreview(props: { survey: Survey }) {
    const { survey } = props;
    const { questions } = survey;

    return (
        <Flex className="flex-col gap-6">
            {
                questions.length !== 0 ?
                    questions.map((q, i) => (
                        <div key={q.id} className="w-full">
                            <Question question={q} order={i + 1} />
                        </div>))
                    : <Text>Brak pytań</Text>
            }

        </Flex>
    )
}