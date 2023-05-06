import SurveyListItem from './SurveyListItem';
import Link from 'next/link';
import { api } from '../../lib/api';
import { Col, Grid } from '@tremor/react';
import SurveyListFilters from './SurveyListFilters';

const color = 'amber'

export default async function SurveysListPage() {

  const surveysData = await api.fetchSurveys();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="mb-6 gap-6" numColsSm={3} numColsLg={3}>

        <Col numColSpan={3} numColSpanLg={3}>
          <SurveyListFilters color={color}></SurveyListFilters>
        </Col>
      </Grid>

      <Grid className="gap-6" numColsSm={2} numColsLg={3}>
        {surveysData.data.map(data => ({
          id: data.id!,
          title: data.attributes.name,
          startDate: data.attributes.startDate,
          endDate: data.attributes.endDate,
          progress: 0,
          questionsCount: data.attributes.questions ? data.attributes.questions.data.length : 0,
          //todo
          responsesCount: 0,
          //todo calculate chart data
        })).map((item) => (
          <Link href={'/surveys/' + item.id} key={item.id}>
            <SurveyListItem survey={item} key={item.id} color={color}></SurveyListItem>
          </Link>
        ))}
      </Grid>
    </main>
  );
}
