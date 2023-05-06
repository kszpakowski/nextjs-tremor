import { Grid, Col, Card, Title, Text, Divider } from "@tremor/react"
import { api } from "../../../lib/api"
import Tabs from "./Tabs"

export default async function NewSurveysPage({ params }: {
    params: { id: string }
}) {

    const survey = await api.fetchSurvey(params.id, true)
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">

            <Grid className="mb-6 gap-6" numColsSm={3} numColsLg={3}>
                <Col numColSpan={3} numColSpanLg={3}>
                    <Tabs survey={survey.data}></Tabs>
                    {/* <Subtitle className="whitespace-pre-wrap">{JSON.stringify(survey, null, 2)}</Subtitle> */}
                </Col>
            </Grid>
        </main>
    )
}