import jwt from "jsonwebtoken"

const jwt_secret = process.env.JWT_SECRET

export const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
    if (!jwt_secret) throw new Error('jwt secret not found')
    return jwt.sign(object, jwt_secret, options)
}

export const verifyJwt = (token: string) => {
    try {
        if (!jwt_secret) throw new Error('jwt secret not found')
        const decoded = jwt.verify(token, jwt_secret)

        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (err: any) {
        console.log(err)
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            decoded: null
        }
    }
}
