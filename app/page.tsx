import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <main>
      <h1>root page</h1>

      <div className="flex flex-col underline ml-2">
        <Link href={'/login'}> login</Link>
        <Link href={'/signUp'}> signUp</Link>

        <Link href={'/note'}>
          <Button variant={'destructive'}>to note</Button>
        </Link>
      </div>

    </main>
  )

}