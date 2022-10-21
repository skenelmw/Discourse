import { NextRequest } from "next/server";
// TODO: Reject if no auth and reject if auth doesnt match hard coded username and pword. base 64 decode

export function middleware(req: NextRequest){
    const authorization = req.headers.get("authorization")
    console.log(authorization)
}