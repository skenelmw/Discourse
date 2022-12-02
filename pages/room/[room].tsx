import { useRouter } from "next/router";

export default function Room () {
    const router = useRouter()

    const channelId = router.query.room;

    return (<><h2>You are at channel {channelId}</h2></>)
}