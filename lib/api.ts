import { stringify } from "qs"
import { Survey } from "../types/Survey"
import { SurveyMapper } from "./mapper"

const apiToken = process.env.API_TOKEN
const baseUrl = process.env.API_URL
const headers = { Authorization: `Bearer ${apiToken}` }

//todo implement fetch wrapper
const fetchConfig = { headers, next: { revalidate: 10 }, }

const handleErrors = (res: Response) => {
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log(res.status)
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
        console.log('fetchSurveys', JSON.stringify(json, null, 2))
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
        console.log('fetchSurvey', JSON.stringify(json, null, 2))

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
        // console.log('fetchSurvey', JSON.stringify(json, null, 2))
        return SurveyMapper.mapFromDto(json.data);
    }
}