import { PrismaClient } from "@prisma/client"
import { omit } from "lodash"
import { UserInput } from "../schemas/user.schema"
import bcrypt from "bcrypt"

const { user } = new PrismaClient()

export const getAllUsers = async () => {
    try {
        const users = await user.findMany()
        return users
    } catch (err: any) {
        throw new Error(err)
    }
}

export const getUserById = async (id: number) => {
    try {
        const _user = await user.findUnique({
            where: { id }
        })
        return omit(_user, 'password')
    } catch (err: any) {
        throw new Error(err)
    }
}

export const createUser = async (input: UserInput) => {
    try {
        const hash = await bcrypt.hashSync(input.password, 10)
        input.password = hash

        const newUser = await user.create({
            data: input
        })
        return omit(newUser, 'password')
    } catch (err: any) {
        throw new Error(err)
    }
}

export const validatePassword = async ({ email, password }: { email: string, password: string }) => {
    const _user = await user.findUnique({
        where: { email }
    })

    if (!_user) return false

    const isValid = await bcrypt.compare(password, _user.password).catch(err => false)

    if (!isValid) return false

    return omit(_user, 'password')
}
