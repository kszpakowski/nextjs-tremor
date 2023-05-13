import { Question } from "../types/Question";
import { Survey } from "../types/Survey";
import { QuestionDto, SurveyDto } from "./api";

export const SurveyMapper = {
    mapFromDto: (surveyDto: SurveyDto): Survey => {
        const questionsDto: Array<QuestionDto> = surveyDto.attributes.questions && surveyDto.attributes.questions.data || [];

        const questions: Array<Question> = questionsDto.map(dto => {
            const type = dto.attributes.type === "open" ? "open" : "choice"
            if (type === "open") {
                return {
                    id: dto.id,
                    type,
                    required: false, // todo
                    text: dto.attributes.questionText
                }
            } else {
                return {
                    id: dto.id,
                    type,
                    required: false,
                    text: dto.attributes.questionText,
                    choices: dto.attributes.choices && dto.attributes.choices.data.map(chDto => ({
                        text: chDto.attributes.choiceText
                    })) || [],
                    otherEnabled: false, // todo
                    multipleAnswers: false // todo
                }
            }
        })

        const mapped: Survey = {
            id: surveyDto.id,
            ...surveyDto.attributes,
            questions
        }

        return mapped;
    }
}