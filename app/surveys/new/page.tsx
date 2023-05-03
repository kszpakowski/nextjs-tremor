'use client';

import { Grid, Col, Card, Flex, TextInput } from "@tremor/react";

export default function NewSurveysPage() {
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Grid className="mb-6 gap-6" numColsSm={3} numColsLg={3}>

                <Col numColSpan={3} numColSpanLg={3}>
                    <Card className='space-y-3'>
                        <Flex className="space-x-3 truncate">
                            <h1>placeholder - Nowa ankieta</h1>
                            <TextInput placeholder="Tytuł" />
                        </Flex>
                    </Card>
                </Col></Grid></main>

    )
}