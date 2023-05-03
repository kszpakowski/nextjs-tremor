'use client';

import { Grid, Col, Card, Flex, TextInput, Text, Title, Button, DateRangePicker } from "@tremor/react";
import Question from "./Question";
import { useState } from "react";

type Question = {
    id: string;
    title: string;
    choices?: Array<string>;
    order: number;
}

const initialQuestions: Array<Question> = [{
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
    const [questions, setQuestions] = useState(initialQuestions)

    const moveUp = (question: { id: string, title: string, order: number }) => {
        if (question.order === 0) {
            return;
        }

        const newOrder = question.order -1;

        const newQuestions = questions.map(q => {

            if (q.id === question.id) {
                q.order = newOrder;
            } else if (q.order === newOrder) {
                q.order = question.order;
            }
            return q;
        })

        setQuestions(newQuestions.sort((a, b) => a.order - b.order))
    }

    const moveDown = (question: Question) => {
        if (question.order === questions.length-1) {
            return;
        }

        const newOrder = question.order +1;
        const previousOrder = question.order;

        const newQuestions = questions.map(q => {

            if (q.id === question.id) {
                q.order = newOrder;
            } else if (q.order === newOrder) {
                q.order = previousOrder;
            }
            return q;
        })

        setQuestions(newQuestions.sort((a, b) => a.order - b.order))
    }

    const remove = (question: Question) => {
        console.log(`Removing ${question.id}..`)

        const newQuestions = questions.filter(q => q.id !== question.id)

        setQuestions(newQuestions)
    }

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
                        {questions
                            .map(question => (
                                <Question
                                    question={question}
                                    onEdit={(id) => console.log(`Editing ${id}`)}
                                    onDelete={remove}
                                    onOrderUp={moveUp}
                                    onOrderDown={moveDown}
                                    key={question.id}
                                ></Question>
                            ))}
                    </Card>
                </Col>
            </Grid>
        </main>

    )
}