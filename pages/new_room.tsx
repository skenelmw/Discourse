import { useSession } from '@supabase/auth-helpers-react'
import Router from 'next/router'

export default function New_Room () {

    const session = useSession()

    if (!session){
        Router.push("/")
    }

}