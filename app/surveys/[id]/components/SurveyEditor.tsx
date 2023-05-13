import { Text, TextInput, DateRangePicker, Flex, Button, Title } from "@tremor/react";
import { useState } from "react";
import { Survey } from "../../../../types/Survey";
import Question from "../../../components/question/Question";

export default function SurveyEditor(props: { survey: Survey }) {
    const { survey } = props

    const [name, setName] = useState(survey.name)
    return (
        <Flex className="flex-col gap-6" alignItems="start">
            <Title>Konfiguracja</Title>
            <Flex className="gap-3">
                <Text>Nazwa</Text>
                <TextInput placeholder="Nazwa" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
            </Flex>

            {/* // todo use date DateRangePicker */}
            <Flex className="gap-3">
                <Text>Data rozpoczęcia</Text>
                <DateRangePicker enableDropdown={false} />
            </Flex>

            <Flex className="gap-3">
                <Text>Data zakończenia</Text>
                <DateRangePicker enableDropdown={false} />
            </Flex>

            <Title>Pytania</Title>
            <Flex className="flex-col gap-8">
                {survey.questions?.map((q, i) =>
                    (<Question question={q} order={i+1} editMode/>)
                )}
            </Flex>

            <Flex>
                <Button variant="secondary">Dodaj pytanie</Button>
                <Button>Zapisz</Button>
            </Flex>
        </Flex>
    )
}