import { stringify } from "qs"
import { Survey } from "../types/Survey"
import { SurveyMapper } from "./mapper"

const apiToken = process.env.API_TOKEN
const baseUrl = process.env.API_URL
const headers = {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
}

const fetchConfig = { headers, next: { revalidate: 10 } }

const handleErrors = async (res: Response) => {
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log(res.status)
        console.log(await res.text())
        throw new Error('Failed to fetch data');
    }
}

type PageResponse<T> = {
    data: Array<T>,
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}

type SingleResponse<T> = {
    data: T,
    meta: {}
}

export type Choice = {
    id: number;
    attributes: {
        choiceText: string
    }
}

export type QuestionDto = {
    id: number,
    attributes: {
        questionText: string,
        type: 'open' | 'single_choice' | 'multiple_choice'
        choices?: {
            data: Array<Choice>
        }
    }
}

export type SurveyDto = {
    id: number,
    attributes: {
        name: string,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        questions?: {
            data: Array<QuestionDto>
        }
    }
}

// https://docs.strapi.io/dev-docs/api/rest/populate-select#relations--media-fields
export const api = {

    fetchSurveys: async (): Promise<PageResponse<SurveyDto>> => {
        const res = await fetch(`${baseUrl}/surveys/?populate=*`, fetchConfig)
        handleErrors(res)
        const json = await res.json();
        return json;
    },
    fetchSurvey: async (id: string, includeQuestions: boolean): Promise<SingleResponse<SurveyDto>> => {

        const query = stringify({
            populate: {
                questions: {
                    populate: ["choices"]
                }
            }
        },
            {
                encodeValuesOnly: true, // prettify URL
            })
        console.log(query)
        const populate = includeQuestions ? '?populate=*' : ''
        const res = await fetch(`${baseUrl}/surveys/${id}?${query}`, fetchConfig)
        handleErrors(res)
        const json = await res.json();

        return await json;
    },
    fetchSurveyMapped: async (id: string, includeQuestions: boolean): Promise<Survey> => {

        const query = stringify({
            populate: {
                questions: {
                    populate: ["choices"]
                }
            }
        },
            {
                encodeValuesOnly: true, // prettify URL
            })

        const res = await fetch(`${baseUrl}/surveys/${id}?${query}`, fetchConfig)
        handleErrors(res)
        const json: SingleResponse<SurveyDto> = await res.json();
        return SurveyMapper.mapFromDto(json.data);
    },
    updateQuestion: async (id: number, data: {
        text: string
    }) => {
        fetch(`http://localhost:1337/api/questions/${id}`, {
            ...fetchConfig, method: 'PUT', body: JSON.stringify({ data: { questionText: data.text } })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    },
    createSurvey: async (name: string) => {

        const body = JSON.stringify({
            data: {
                name: name,
                startDate: "2023-05-22T21:04:40Z",
                endDate: "2023-06-22T21:04:40Z"
            }
        })

        console.log('body', body)
        const res = await fetch(`${baseUrl}/surveys/`, {
            ...fetchConfig, method: 'POST', body
        })
        handleErrors(res)
        const { data } = await res.json();
        return {
            id: data.id
        };
    },
    addQuestionToSurvey: async (surveyId: number, questionText: string) => {

        const createQuestionBody = JSON.stringify({
            data: {
                questionText,
                type: 'open'
            }
        })

        const createQuestionRes = await fetch(`${baseUrl}/questions/`, {
            ...fetchConfig, method: 'POST', body: createQuestionBody
        })
        handleErrors(createQuestionRes)
        const { data } = await createQuestionRes.json();
        const questionId = data.id

        const connectQuestionBody = JSON.stringify({
            data: {
                questions: {
                    connect: [questionId]
                },
            }
        })

        const connectQuesitonRes = await fetch(`${baseUrl}/surveys/${surveyId}`, {
            ...fetchConfig, method: 'PUT', body: connectQuestionBody
        })
        handleErrors(connectQuesitonRes)

        return {
            id: questionId
        };
    }
}