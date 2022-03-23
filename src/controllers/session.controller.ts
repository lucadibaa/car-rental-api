import { Request, Response } from "express"
import { createSession, findUserSessions, updateSession } from "../services/session.service"
import { validatePassword } from "../services/user.service"
import { signJwt } from "../utils/jwt.utils"

export const createUserSessionHandler = async (req: Request, res: Response) => {
    // validate user's password
    const user = await validatePassword(req.body)

    if (!user) return res.status(401).send('Invalid email or password')

    // create a session
    const session = await createSession(user.id, req.get('user-agent') || '')

    // create an access token
    const accessToken = signJwt({ ...user, session: session.id }, { expiresIn: '30m' })

    // create a refresh token
    const refreshToken = signJwt({ ...user, session: session.id }, { expiresIn: '1y' })

    // return access & refresh token
    return res.status(201).json({ accessToken, refreshToken })
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id

    const sessions = await findUserSessions(userId)

    return res.send(sessions)
}

export const deleteSessionsHandler = async (req: Request, res: Response) => {
    const sessionId = res.locals.user.session

    await updateSession(sessionId, { valid: false })

    return res.send({ accessToken: null, refreshToken: null })
}
