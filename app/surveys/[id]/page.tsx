import { Grid, Col, Card, Title, Subtitle, Text, Divider } from "@tremor/react"
import { api } from "../../../lib/api"

export default async function NewSurveysPage({ params }: {
    params: { id: string }
}) {

    const survey = await api.fetchSurvey(params.id, true)
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Grid className="mb-6 gap-6" numColsSm={3} numColsLg={3}>
                <Col numColSpan={3} numColSpanLg={3}>
                    <Card >
                        <Title>{survey.data.attributes.name}</Title>
                        {survey.data.attributes.questions && survey.data.attributes.questions.data.map((q, i) => (
                            <div key={q.id}>
                                <Text className="mb-3">{i+1}. {q.attributes.questionText}</Text>
                                <Text>{q.attributes.type}</Text>              
                                <Divider></Divider>
                            </div>
                        ))}
                    </Card>

                    <Subtitle className="whitespace-pre-wrap">{JSON.stringify(survey, null, 2)}</Subtitle>
                </Col>
            </Grid>
        </main>
    )
}