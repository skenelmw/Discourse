import { CharacterData, characterConverter } from "./types";
import * as dotenv from 'dotenv'
dotenv.config()
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    console.log(data[69].id)


    await prisma.rick.createMany({
       data: data.map(characterConverter)
    })
    //     return client.query(`
    //     INSERT INTO rick (name, status, origin_name, origin_url, location_name, location_url, image, id)
    //     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    // `, [character.name, character.status, character.origin.name, character.origin.url, character.location.name, character.location.url, character.image, character.id])

    return res.status(200).json({message: "hi"})
}