'use client'

export default function Home() {

    const currentDate = new Date().toLocaleDateString()

    return (
        <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">

            <div className="p-40 gap-5 flex flex-col">
                <div className="flex  justify-between">
                    <h1 className="text-4xl font-bold">
                        Titulo <span className="text-neutral-600 text-3xl font-[family-name:var(--font-geist-mono)]">#numero note</span>
                    </h1>
                    <p className="text-sm font-bold">• data note </p>
                </div>

                <p className="text-xl font-[family-name:var(--font-geist-mono)]">
                    text of note...
                </p>
            </div>

        </main>
    )
}
