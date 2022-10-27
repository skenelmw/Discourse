import { NextRequest } from "next/server";

export function middleware(req: NextRequest){
    
    if (req.url === 'http://localhost:3000/api/rick/fetcher'){
        if (!req.headers.get("authorization") || req.headers.get("authorization")?.indexOf('Basic ') === -1) {
            throw { status: 401, message: 'Missing Authorization Header' };
        } 
        const base64Creds = req.headers.get("authorization")?.split(' ')[1]
        console.log(base64Creds)
        if (base64Creds !== "bGlseTpjYW1zdWNrcw=="){
            throw { status: 401, message: 'Invalid Authentication Credentials' };
        }


    }
    
}