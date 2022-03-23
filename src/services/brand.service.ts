import { PrismaClient } from "@prisma/client"
import { BrandInput } from "../schemas/brand.schema"

const { brand } = new PrismaClient()

export const getAllBrands = async () => {
    try {
        const brands = await brand.findMany()
        return brands
    } catch (err: any) {
        throw new Error(err)
    }
}

export const addBrand = async (input: BrandInput) => {
    try {
        const brands = await brand.create({
            data: input
        })
        return brands
    } catch (err: any) {
        throw new Error(err)
    }
}
