const apiToken = process.env.API_TOKEN
const baseUrl = process.env.API_URL
const headers = { Authorization: `Bearer ${apiToken}` }

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

type Question = {
    id: number,
    attributes: {
        questionText: string,
        type: 'open' | 'single_choice' | 'multiple_choice'
    }
}

type Survey = {
    id: number,
    attributes: {
        name: string,
        startDate: string,
        endDate: string,
        createdAt: string,
        updatedAt: string,
        questions?: {
            data: Array<Question>
        }
    }
}

// https://docs.strapi.io/dev-docs/api/rest/populate-select#relations--media-fields
export const api = {

    fetchSurveys: async (): Promise<PageResponse<Survey>> => {
        const res = await fetch(`${baseUrl}/surveys/?populate=*`, { headers })
        handleErrors(res)
        const json = await res.json();
        console.log('fetchSurveys', JSON.stringify(json, null, 2))
        return json;
    },
    fetchSurvey: async (id: string, includeQuestions: boolean): Promise<SingleResponse<Survey>> => {
        const populate = includeQuestions ? '?populate=*' : ''
        const res = await fetch(`${baseUrl}/surveys/${id}/${populate}`, { headers })
        handleErrors(res)
        return await res.json();
    }
}