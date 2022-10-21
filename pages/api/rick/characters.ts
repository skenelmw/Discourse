import type { NextApiRequest, NextApiResponse } from 'next'

import type { Response } from './types'
import characters from './rick_api.json'

export default function handler (
    req: NextApiRequest,
    res:NextApiResponse<Response>
) {
    const { page, name } = req.query;
    

    const list =  name && typeof name === "string" ? 
        characters.filter(({name: completeName}) => {
            return completeName.toLowerCase().includes(name.toLowerCase());
        }) : characters
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