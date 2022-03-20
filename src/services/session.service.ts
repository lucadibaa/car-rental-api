import { signJwt, verifyJwt } from "../utils/jwt.utils"
import { get } from "lodash"
// import { findUser } from "./user.service"
import { PrismaClient } from "@prisma/client"
import { getUserById } from "./user.service"

const { session } = new PrismaClient()

export const createSession = async (id: number, userAgent: string) => {
    const newSession = await session.create({
        data: {
            userAgent,
            user: {
                connect: { id }
            }
        }
    })
    return newSession
}

export const findUserSessions = async (id: number) => {
    return session.findMany({
        where: {
            AND: [
                { id },
                { valid: true }
            ]
        }
    })
}

export const updateSession = async (id: number, update: object) => {
    return await session.update({
        where: { id },
        data: update
    })
}

export const reIssueAccessToken = async ({ refreshToken }: { refreshToken: string }) => {
    const { decoded } = verifyJwt(refreshToken)

    if (!decoded || !get(decoded, 'session')) return false

    const _session = await session.findUnique({
        where: { id: get(decoded, 'session') }
    })

    if (!_session || !_session.valid) return false

    const user = await getUserById(_session.userId)

    if (!user) return false

    const accessToken = signJwt({ ...user, session: _session.id }, { expiresIn: '15m' })

    return accessToken
}
