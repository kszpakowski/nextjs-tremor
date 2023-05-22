import { NextApiRequest, NextApiResponse } from "next";
import { CreateSurveyRes } from "..";
import { api } from "../../../../lib/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse<CreateSurveyRes>) {

    if (req.method === 'POST') {

        const { body } = req;
        const { id } = req.query

        const question = await api.addQuestionToSurvey(id, body.questionText)

        res.status(200).json(question);
    } else {
        // Handle any other HTTP method
        res.status(415).end()
    }

}