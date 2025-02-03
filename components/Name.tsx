import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'

const name = () => {

  const [nome, setNome] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const dataUser = localStorage.getItem("usuario");
      if (dataUser) {
        const parsedData = JSON.parse(dataUser);
        const nome = parsedData.nome
        setNome(nome)
      }
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {loading ? (
        <>
          <Skeleton className="h-5 w-20 rounded-[4px]" />
        </>
      ) : (
        <>
          {nome}'s
        </>

      )}
    </div>
  )
}

export default name