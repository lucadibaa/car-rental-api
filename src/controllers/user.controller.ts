import { Request, Response } from "express"
import { CreateUserInput } from "../schemas/user.schema"
import { createUser, getAllUsers, getUserById } from "../services/user.service"

export const getAllUsersHandler = async (req: Request, res: Response) => {
    const users = await getAllUsers()

    if (!users) return res.sendStatus(404)

    return res.status(200).json({ success: true, users })
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    const user = await getUserById(Number(req.params.id))

    if (!user) return res.sendStatus(404)

    return res.status(200).json({ success: true, user })
}

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    try {
        const user = await createUser(req.body)
        return res.status(201).json({ success: true, user })
    } catch (err: any) {
        if (err.message.includes("Unique constraint failed on the fields: (`email`)")) err.message = "This user already exists!"
        return res.status(409).json({ success: false, error: err.message })
    }
}
