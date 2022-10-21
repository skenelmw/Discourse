import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { message: string }

export default function handler (
    req: NextApiRequest,
    res:NextApiResponse<Data>
) {
    console.log(req.query);
    if (!req.query.target) {
        return res.status(400).json({message: "you need a target for your massive verb"})
    }
    return res.status(200).json({message: req.query.subject1 + " ruined " + req.query.target + "'s life with a massive " + req.query.verb + "."})

}