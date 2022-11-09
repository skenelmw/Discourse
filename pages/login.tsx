import { useSession } from '@supabase/auth-helpers-react'
import Router from 'next/router'
import {supabase} from '../utils/supabase'

export default function Login () {

  const session = useSession()

  if (session){
    Router.push("/")
  }

  async function signInWithGoogle() {

    const { data, error } = await supabase.auth.signInWithOAuth({
  
      provider: 'google',
  
    })
  
  }

  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
      
}