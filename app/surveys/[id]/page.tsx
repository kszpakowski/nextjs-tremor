import { Grid, Col } from "@tremor/react"
import { api } from "../../../lib/api"
import Tabs from "./components/Tabs"

export default async function NewSurveysPage({ params }: {
    params: { id: string }
}) {

    const survey = await api.fetchSurveyMapped(params.id, true)

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">

            <Grid className="mb-6 gap-6" numColsSm={3} numColsLg={3}>
                <Col numColSpan={3} numColSpanLg={3}>
                    <Tabs survey={survey}></Tabs>
                </Col>
            </Grid>
        </main>
    )
}