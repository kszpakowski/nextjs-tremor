'use client';

import { MagnifyingGlassIcon, CheckIcon, StopIcon, PlayIcon, ArchiveBoxIcon, ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { Card, Text, Flex, Grid, TextInput, Bold, Col, Toggle, ToggleItem } from '@tremor/react';
import { useState } from 'react';
import SurveyListItem from './SurveyListItem';
import Link from 'next/link';

type Survey = {
  id: string;
  title: string;
  metric: string;
  metricPrev: string;
  startDate?: string;
  endDate?: string;
  tags?: Array<string>;
  responseCount?: number;
  questionsCount?: number;
  progress: number;
  chartdata?: Array<{
    date: string,
    responses: number
  }>,
  archived?: boolean
}

const categories: Survey[] = [
  {
    id: "1",
    title: 'Ogólne badanie NPS',
    metric: '$ 12,699',
    metricPrev: '$ 9,456',
    startDate: '2023-04-28',
    endDate: '2023-05-28',
    tags: ['moje.nn.pl'],
    responseCount: 341,
    questionsCount: 6,
    progress: 20,
    chartdata: [
      {
        date: "Jan 22",
        responses: 63,
      },
      {
        date: "Feb 22",
        responses: 43,
      },
      {
        date: "Mar 22",
        responses: 57,
      },
      {
        date: "Apr 22",
        responses: 39,
      },
      {
        date: "May 22",
        responses: 44,
      },
      {
        date: "Jun 22",
        responses: 25,
      },
      {
        date: "Jun 28",
        responses: 6,
      },
    ]
  },
  {
    id: "2",
    title: 'Proces zgłaszania roszczeń',
    metric: '$ 40,598',
    metricPrev: '$ 45,564',
    startDate: '2023-03-01',
    endDate: '2023-06-30',
    tags: ['moje.nn.pl', 'claims'],
    responseCount: 231,
    questionsCount: 4,
    progress: 45,
    chartdata: [
      {
        date: "Jan 22",
        responses: 23,
      },
      {
        date: "Feb 22",
        responses: 26,
      },
      {
        date: "Mar 22",
        responses: 34,
      },
      {
        date: "Apr 22",
        responses: 68,
      },
      {
        date: "May 22",
        responses: 43,
      },
      {
        date: "Jun 22",
        responses: 9,
      },
    ]
  },
  {
    id: "3",
    title: 'Proces zmiany danych',
    metric: '1,072',
    metricPrev: '856',
    // tag: 'moje.nn.pl/claims',
    progress: 89,
    archived: true
  },
  {
    id: "4",
    title: 'Customers',
    metric: '1,072',
    metricPrev: '856',
    // tag: 'moje.nn.pl/claims',
    progress: 100
  }
];

const filters = {
  all: (survey: Survey) => !survey.archived,
  active: (survey: Survey) => !survey.archived && survey.progress < 100,
  completed: (survey: Survey) => !survey.archived && survey.progress == 100,
  archived: (survey: Survey) => survey.archived,
}

const surveysTranslation = (count: number) => (count === 1) ? 'Ankieta' : (count % 10 === 1 || count % 10 > 4) ? "Ankiet" : "Ankiety"

const color = 'amber'

export default function SurveysListPage() {

  const [value, setValue] = useState("all");

  const surveys = () => categories.filter(filters[value as keyof typeof filters])

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="mb-6 gap-6" numColsSm={3} numColsLg={3}>

        <Col numColSpan={3} numColSpanLg={3}>
          <Card className='space-y-3'>
            <Flex className="space-x-3 truncate">
              <TextInput icon={MagnifyingGlassIcon} color={color} placeholder="Szukaj..." />
            </Flex>
            <Flex
              alignItems='baseline'>
              <Toggle defaultValue="all" color={color} onValueChange={setValue}>
                <ToggleItem value="all" text="Wszystkie" icon={CheckIcon} />
                <ToggleItem value="active" text="Aktywne" icon={PlayIcon} />
                <ToggleItem value="completed" text="Zakończone" icon={StopIcon} />
                <ToggleItem value="archived" text="Zarchiwizowane" icon={ArchiveBoxIcon} />
              </Toggle>
              <Toggle defaultValue="last_updated" color={color} onValueChange={console.log}>
                <ToggleItem value="last_updated" text="Ostatnio zaktualizowane" icon={ArrowDownCircleIcon}/>
                <ToggleItem value="last_finished" text="Ostatnio zakończone" />
              </Toggle>
            </Flex>
          </Card>
        </Col>
      </Grid>

      <Grid className="gap-6" numColsSm={2} numColsLg={3}>
        {surveys().map((item) => (
          <Link href={'/surveys/'+item.id} key={item.id}>
            <SurveyListItem survey={item} key={item.id} color={color}></SurveyListItem>
          </Link>
        ))}
      </Grid>
    </main>
  );
}
