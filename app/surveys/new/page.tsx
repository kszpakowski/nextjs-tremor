'use client';

import { Grid, Col, Card, Flex, TextInput, Text, Title, Button, DateRangePicker } from "@tremor/react";
import Question from "./Question";

const questions = [{
    id: "1",
    order: 0,
    title: "Jak oceniasz proces logowania do portalu ubezpieczeniowego?",
    choices: ["Bardzo łatwy", "Łatwy", "Średnio trudny", "Trudny", "Bardzo trudny"]
},
{
    id: "2",
    order: 1,
    title: "Jak oceniasz szybkość procesu logowania?",
    choices: ["Bardzo szybki", "Szybki", "Średnio szybki", "Wolny", "Bardzo wolny"]
},
{
    id: "3",
    order: 2,
    title: "Czy zdarzyło Ci się doświadczyć problemów z zalogowaniem się na portalu ubezpieczeniowym? Jeśli tak, jakie były to problemy?",
}]

export default function NewSurveysPage() {
    return (
        <main className="p-4 md:p-10 mx-auto">
            <Grid className="mb-6 gap-6" numColsSm={4} numColsLg={4}>
                <Col numColSpan={1} numColSpanLg={1}>
                    <Card className='space-y-3'>
                        <Title>Nowa ankieta</Title>
                        <Text>Nazwa</Text>
                        <TextInput placeholder="Nazwa" />

                        <Text>Data rozpoczęcia</Text>
                        <DateRangePicker className="max-w-sm mx-auto" enableDropdown={false} />

                        <Text>Data zakończenia</Text>
                        <DateRangePicker className="max-w-sm mx-auto" enableDropdown={false} />

                        <Flex>
                            <Button variant="secondary">Dodaj pytanie</Button>
                            <Button>Zapisz</Button>
                        </Flex>
                    </Card>
                </Col>
                <Col numColSpan={3} numColSpanLg={3}>
                    <Card className='space-y-8'>
                        {questions.sort((a,b) => a.order - b.order).map(question => (
                            <Question
                                id={question.id}
                                key={question.id}
                                title={question.title}
                                choices={question.choices}
                                onEdit={(id) => console.log(`Editing ${id}`)}
                                onDelete={(id) => console.log(`Deleting ${id}`)}
                                onOrderUp={(id) => console.log(`Moving ${id} up`)}
                                onOrderDown={(id) => console.log(`Moving ${id} down`)}></Question>
                        ))}
                    </Card>
                </Col>
            </Grid>
        </main>

    )
}