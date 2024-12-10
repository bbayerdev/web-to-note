'use client'

export default function Home() {

  const currentDate = new Date().toLocaleDateString()

  return (
    <main className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">

      <div className="px-40 py-14 gap-5 flex flex-col">
        <div className="flex flex-col gap-2">
          <p className=" text-sm text-neutral-600 font-bold font-[family-name:var(--font-geist-mono)]">{currentDate.toString()}</p>
          <h1 className="text-4xl mt-2 font-bold">
            Your-Note <span className="text-neutral-600 text-3xl font-[family-name:var(--font-geist-mono)]">#6</span>
          </h1>

        </div>

        <p className="text-xl font-[family-name:var(--font-geist-mono)]">
          Write your note here...
        </p>
      </div>

    </main>
  )
}
