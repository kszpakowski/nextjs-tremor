"use client"

import { Card, Tab, TabList, Title } from "@tremor/react";
import { useState } from "react";
import { Survey } from "../../../lib/api";
import SurveyPreview from "./SurveyPreview";
import SurveyEditor from "./SurveyEditor";

export default function Tabs(props: { survey: Survey }) {
    const [currentTab, setCurrentTab] = useState("preview")
    const { survey } = props;
    return (
        <> <Title>{survey.attributes.name}</Title>
            <TabList onValueChange={setCurrentTab} className="mb-6" defaultValue="preview">
                <Tab text="Odpowiedzi" value="answers"></Tab>
                <Tab text="Edycja" value="edit"></Tab>
                <Tab text="Podgląd" value="preview"></Tab>
            </TabList>
            <Card>
                {currentTab === 'preview' ? (
                    <SurveyPreview survey={survey}></SurveyPreview>
                ) : (<></>)}

                {currentTab === 'edit' ? (
                    <SurveyEditor survey={survey}></SurveyEditor>
                ) : (<></>)}
            </Card>
        </>
    )
}