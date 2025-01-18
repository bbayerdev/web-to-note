import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {

  const session = await getServerSession()

  if(!session){
    return redirect('/')
  }

  return (
    <main>
        salve {session.user?.name} <br />
        email: {session.user?.email}
    </main>
  )
}

export default page