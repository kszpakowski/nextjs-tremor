import { StopIcon, PlayIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { Card, Text, Flex, Title, Badge, ProgressBar, Bold, AreaChart, Icon } from '@tremor/react';


type SurveyListItemProps = {
  survey: {
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
    }>;
    archived?: boolean;
  },
  color: 'red' | 'blue' | 'amber';
}

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

export default function SurveyListItem(props: SurveyListItemProps){


    const {survey, color} = props;

    return (
        <Card key={survey.id} className='cursor-pointer textransition duration-500 hover:scale-105'>
            <Flex alignItems="center" justifyContent='between'>
              <Title>{survey.title}</Title>
              <Icon icon={survey.archived? ArchiveBoxIcon : survey.progress !== 100 ? PlayIcon : StopIcon} color={color}></Icon>
            </Flex>

            <Flex
              className="mt-4 space-x-3 truncate"
            >
              <Text className="truncate">{survey.startDate}</Text>
              <Text className="truncate">{survey.endDate}</Text>
            </Flex>
            <ProgressBar percentageValue={survey.progress} color={color} className="mt-3" />
            <AreaChart
              className="h-48 mt-4"
              data={survey.chartdata ? survey.chartdata : []}
              index="date"
              categories={["responses"]}
              colors={[color]}
              valueFormatter={dataFormatter}

              showXAxis={false}
              showYAxis={false}
              showLegend={false}
            />
            <Flex
              className="space-x-3 mt-4"
              justifyContent="between"
              alignItems="baseline"
            >
              <Flex justifyContent='start'>
                {survey.tags?.map(tag => <Badge size="xs" color={color} className='mr-2'>{tag}</Badge>)}
              </Flex>
              <Flex>
                <div>
                  <Bold>{survey.questionsCount}</Bold>
                  <Text>pytań</Text>
                </div>
                <div>
                  <Bold>{survey.responseCount}</Bold>
                  <Text>odpowiedzi</Text>
                </div>
              </Flex>
            </Flex>
          </Card>
    )
}