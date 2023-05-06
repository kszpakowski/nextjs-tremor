"use client"

import { format } from 'date-fns'
import { StopIcon, PlayIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { Card, Text, Flex, Title, Badge, ProgressBar, Bold, AreaChart, Icon } from '@tremor/react';


type Survey = {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    tags?: Array<string>;
    responsesCount?: number;
    questionsCount?: number;
    chartdata?: Array<{
        date: string,
        responses: number
    }>;
    archived?: boolean;
}

type SurveyListItemProps = {
    survey: Survey,
    color: 'red' | 'blue' | 'amber';
    showChart?: boolean
}

const dataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

const dateFormatter = (dateString: string) => {
    return format(new Date(dateString), "yyyy-MM-dd hh:mm")
}


const progressFn = (survey: Survey): number => {
    const { startDate, endDate, id } = survey;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    if (end < now) {
        return 100;
    }

    if (start > now) {
        return 0;
    }

    var durationInDays = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    var daysFromStart = (now.getTime() - start.getTime()) / (1000 * 3600 * 24);

    return Math.round(durationInDays / daysFromStart)
}

export default function SurveyListItem(props: SurveyListItemProps) {


    const { survey, color, showChart } = props;
    const progress = progressFn(survey)

    return (
        <Card key={survey.id} className='cursor-pointer textransition duration-500 hover:scale-105'>
            <Flex alignItems="center" justifyContent='between'>
                <Title>{survey.title}</Title>
                <Icon icon={survey.archived ? ArchiveBoxIcon : progress < 100 ? PlayIcon : StopIcon} color={color}></Icon>
            </Flex>

            <Flex
                className="mt-4 space-x-3 truncate"
            >
                <Text className="truncate">{dateFormatter(survey.startDate)}</Text>
                <Text className="truncate">{dateFormatter(survey.endDate)}</Text>
            </Flex>
            <ProgressBar percentageValue={progress} color={color} className="mt-3" tooltip={`${progress}%`} />
            {showChart && (<AreaChart
                className="h-48 mt-4"
                data={survey.chartdata ? survey.chartdata : []}
                index="date"
                categories={["responses"]}
                colors={[color]}
                valueFormatter={dataFormatter}

                showGridLines={false}
                showXAxis={false}
                showYAxis={false}
                showLegend={false}
            />)}

            <Flex
                className="space-x-3 mt-4"
                justifyContent="between"
                alignItems="baseline"
            >
                <Flex justifyContent='start'>
                    {survey.tags?.map((tag, i) => <Badge size="xs" color={color} className='mr-2' key={i}>{tag}</Badge>)}
                </Flex>
                <Flex>
                    <div>
                        <Bold>{survey.questionsCount}</Bold>
                        <Text>pytań</Text>
                    </div>
                    <div>
                        <Bold>{survey.responsesCount}</Bold>
                        <Text>odpowiedzi</Text>
                    </div>
                </Flex>
            </Flex>
        </Card>
    )
}