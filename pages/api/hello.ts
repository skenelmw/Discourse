// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string
  message?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.query)
  const { name } = req.query
  console.log(name)
  if (!name || typeof name !== 'string') {
    return res.status(400).json({message: "put in an actual name you pillock"})
  }
  return res.status(200).json({ name })
}
