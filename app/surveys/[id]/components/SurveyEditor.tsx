import { Text, TextInput, DateRangePicker, Flex, Button, Subtitle, Title } from "@tremor/react";
import { Survey } from "../../../../lib/api";
import { useState } from "react";

export default function SurveyEditor(props: { survey: Survey }) {
    const { survey } = props

    const [name, setName] = useState(survey.attributes.name)
    return (
        <Flex className="flex-col gap-6" alignItems="start">
            <Title>Konfiguracja</Title>
            <Flex className="gap-3">
                <Text>Nazwa</Text>
                <TextInput placeholder="Nazwa" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
            </Flex>

            <Flex className="gap-3">
                <Text>Data rozpoczęcia</Text>
                <DateRangePicker enableDropdown={false} />
            </Flex>

            <Flex className="gap-3">
                <Text>Data zakończenia</Text>
                <DateRangePicker enableDropdown={false} />
            </Flex>

            <Title>Pytania</Title>
            {
                props.survey.attributes.questions?.data.map(q => (
                    <Text key={q.id}>{q.attributes.questionText}</Text>
                ))
            }

            <Flex>
                <Button variant="secondary">Dodaj pytanie</Button>
                <Button>Zapisz</Button>
            </Flex>
        </Flex>
    )
}