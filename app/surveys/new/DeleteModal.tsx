import { Card, Title, Subtitle, Button, Flex } from "@tremor/react";
import Modal from "./Modal";
import { Question } from "./types";

export default function DeleteModal({ question, onClose, onDelete }: { question: Question, onClose: () => void, onDelete: () => void }) {
    return (
        <Modal children={
            <Card className="sm:my-8 sm:w-full sm:max-w-lg space-y-8">
                <Title>Czy na pewno chcesz skasować pytanie?</Title>
                <Subtitle>{question.title}</Subtitle>
                <Flex>
                    <Button variant="primary" onClick={onDelete}>Tak</Button>
                    <Button variant="secondary" onClick={onClose}>Nie</Button>
                </Flex>
            </Card>
        }></Modal>)
}