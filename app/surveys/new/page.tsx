'use client';

import { Grid, Col, Card, Flex, TextInput, Text, Title, Button, DateRangePicker } from "@tremor/react";

import { useState } from "react";
import EditModal from "./EditModal";
import { Question } from "./types";
import QuestionItem from "./QuestionItem";
import DeleteModal from "./DeleteModal";

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
    const [deleteQuestion, setDeleteQuestion] = useState<Question | null>(null)
    const [editQuestion, setEditQuestion] = useState<Question | null>(null)

    const moveUp = (question: { id: string, title: string, order: number }) => {
        if (question.order === 0) {
            return;
        }

        const newOrder = question.order - 1;

        const newQuestions = questions.map(q => {

            if (q.id === question.id) {
                q.order = newOrder;
            } else if (q.order === newOrder) {
                q.order = question.order;
            }
            return q;
        })

        setQuestions(newQuestions)
    }

    const moveDown = (question: Question) => {
        if (question.order === questions.length - 1) {
            return;
        }

        const newOrder = question.order + 1;
        const previousOrder = question.order;

        const newQuestions = questions.map(q => {

            if (q.id === question.id) {
                q.order = newOrder;
            } else if (q.order === newOrder) {
                q.order = previousOrder;
            }
            return q;
        })

        setQuestions(newQuestions)
    }

    const remove = (id: string) => {
        console.log(`Removing ${id}..`)

        const newQuestions = questions.filter(q => q.id !== id)

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
                            .sort((a, b) => a.order - b.order)
                            .map(question => (
                                <QuestionItem
                                    question={question}
                                    onEdit={setEditQuestion}
                                    onDelete={setDeleteQuestion}
                                    onOrderUp={moveUp}
                                    onOrderDown={moveDown}
                                    key={question.id}
                                ></QuestionItem>
                            ))}
                    </Card>
                </Col>
                {deleteQuestion && (
                    <DeleteModal
                        question={deleteQuestion}
                        onClose={() => setDeleteQuestion(null)}
                        onDelete={() => { remove(deleteQuestion.id); setDeleteQuestion(null); }}></DeleteModal>
                )}

                {editQuestion && (
                    <EditModal
                        question={editQuestion}
                        onClose={() => setEditQuestion(null)}></EditModal>
                )}

            </Grid>
        </main>

    )
}