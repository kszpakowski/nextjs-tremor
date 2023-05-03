import { Card, Title, Tab, TabList, Subtitle, TextInput, Button } from "@tremor/react";
import Modal from "./Modal";
import { Question } from "./types";

export default function EditModal({ question, onClose }: { question: Question, onClose: () => void }) {
    return (
        <Modal children={
            <Card className="sm:my-8 sm:w-full sm:max-w-lg space-y-8">
                <Title>Edycja</Title>
                <TabList
                    defaultValue="1"
                    // onValueChange={(value) => setShowCard(value === "1")}
                    className="mt-6"
                >
                    <Tab value="1" text="Otwarte" />
                    <Tab value="2" text="Jednokrotnego wyboru" />
                </TabList>
                <Subtitle>Pytanie</Subtitle>
                <TextInput value={question.title} />

                <Button variant="secondary" onClick={onClose}>Anuluj</Button>
            </Card>
        }></Modal>
    )
}