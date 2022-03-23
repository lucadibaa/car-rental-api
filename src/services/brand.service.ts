import { PrismaClient } from "@prisma/client"

const { brand } = new PrismaClient()

export const getAllBrands = async () => {
    try {
        const brands = await brand.findMany()
        return brands
    } catch (err: any) {
        throw new Error(err)
    }
}
