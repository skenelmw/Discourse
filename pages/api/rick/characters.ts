import type { NextApiRequest, NextApiResponse } from 'next'

import type { Response } from './types'
import { Client } from 'pg';
import characters from './rick_api.json'

export default async function handler (
    req: NextApiRequest,
    res:NextApiResponse<Response>
) {
    const { page, name } = req.query;
    const client = new Client(process.env.DATABASE_URL)
    client.connect()
    

    let list = []  
    if(name && typeof name === "string"){
        const { rows } = await client.query({text: `SELECT name, status, origin_name, origin_url, location_name, location_url, image, id 
        FROM rick WHERE LOWER(name) LIKE CONCAT('%', $1::TEXT, '%')`, values: [name.toLowerCase()]})
        list = rows
    } else {
        const { rows } = await client.query(`SELECT name, status, origin_name, origin_url, location_name, location_url, image, id 
        FROM rick`)
        list = rows
    }
    if (page && typeof page === "string" && !Number.isNaN(parseInt(page))){
        const actualNumber = parseInt(page);
        const results = list.slice((actualNumber - 1) * 10, (actualNumber - 1) * 10 + 10 );
        const info = { 
            prev: actualNumber ===1 ? null : `localhost:3000/api/rick/characters?page=${actualNumber-1}${name ? `&name=${name}` : ``}`,
            next: actualNumber < (list.length / 10) ? `localhost:3000/api/rick/characters?page=${actualNumber+1}${name ? `&name=${name}` : ``}` : null,
            count: list.length,
            pages: Math.ceil(list.length / 10)
        }
        return res.status(200).json({ results, info })
    }
    
    const results = list.slice(0, 9);
    const info = { prev: null, next: `localhost:3000/api/rick/characters?page=2${name ? `&name=${name}` : ``}`, count: list.length, pages: Math.ceil(list.length / 10) };

    return res.status(200).json({ results, info })
}