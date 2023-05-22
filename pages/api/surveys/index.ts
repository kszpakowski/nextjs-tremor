import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../lib/api";

export type CreateSurveyRes = {
    id: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<CreateSurveyRes>) {

    if (req.method === 'POST') {

        const { body } = req;

        console.log('next api, body',body)

        const survey = await api.createSurvey(body.name)

        res.status(200).json(survey);
    } else {
        // Handle any other HTTP method
        res.status(415).end()
    }

    
}