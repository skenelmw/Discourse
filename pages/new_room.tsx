import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export default function NewRoom () {

    const [roomName, setRoomName] = useState<string>("")
    const session = useSession()
    const router = useRouter()

    if (!session){
        // router.push("/")
        console.log(`you shouldn't be here`)
    }

    const newRoom = (e: React.FormEvent) => {

        e.preventDefault()
        fetch('/api/roomMaker', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: session?.user.id, roomName: roomName}),
        }).then(res => res.json()).then(room => {
            router.push('/room/')
        })


    } 

    return (
        <div>
            <p>Name your new room:</p>
            <form onSubmit={newRoom}>
                <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)}/>
                <input type="submit" />
            </form>
        </div>
    )
}