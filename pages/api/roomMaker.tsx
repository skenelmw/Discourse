import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type Data = { message: string }

export default async function handler (
    req: NextApiRequest,
    res:NextApiResponse<Data>
) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
      }

    if (!req.body.id) {
        res.status(400).send({ message: 'no login details found' })
        return
    }

    const room = await prisma.rooms.create({
        data: {
            host_id: req.body.id,
            room_name: req.body.roomName,
            participant_ids: [req.body.id]
        },
    })

    // maybe do some error handling here as required?
    return room

}