import { CharacterData } from "./types";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string }
export default async function fetcher(
    req: NextApiRequest,
    res:NextApiResponse<Data>
) {
    if(req.method !== 'POST'){
       return res.status(405).json({message: "POST requests only please."})
    }

    let data : CharacterData[] | never[] = [];
    let next = `https://rickandmortyapi.com/api/character/?page=1`;

    do {
        const res = await fetch(next);
        const { info, results } = await res.json();
        data = [...data, ...results]
        next = info.next;
    } while (next);

    console.log("received " + data.length + " results")
    fs.writeFile('./pages/api/rick/rick_api.json', JSON.stringify(data, null, 2), (error) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log(`wrote file okay bro`)
        }
    });
    return res.status(200).json({message: "hi"})
}