import { Title } from '@tremor/react';

export const dynamic = 'force-dynamic';

export default async function IndexPage({
    searchParams
}: {
    searchParams: { q: string };
}) {

    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Index page (todo)</Title>
        </main>
    );
}