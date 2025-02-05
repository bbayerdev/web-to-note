import { Button } from '@/components/ui/button'
import axios from 'axios';
import { Loader } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import React, { useState } from 'react'

const GoogleLoginButton = () => {

    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const imageUrl = session?.user?.image

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const result = await signIn('google', { redirect: false })

            if (result?.error) {
                console.error('Erro na autenticação com Google:', result.error)
                return
            }

            if (session?.user) {
                const { email, name } = session.user

                const response = await axios.post('http://localhost:3001/auth/google', {
                    email,
                    name,
                    imageUrl
                })

                const usuario = response.data
                localStorage.setItem("usuario", JSON.stringify(usuario))

                if (response.status === 201) {
                    window.location.href = '/signUp/congratulations'
                } else {
                    window.location.href = '/note'
                }

            }
        } catch (error) {
            console.error('Erro no login com Google:', error)
            setLoading(false)
        }
    }

    return (

        <div>
            {loading ? (
                <Button className="w-full rounded-[6px]" disabled>
                    <Loader className="animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button variant={'secondary'} className="w-full rounded-[6px]" onClick={handleGoogleLogin}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                        />
                    </svg>
                    Login with Google
                </Button>
            )}
        </div>

    )
}

export default GoogleLoginButton