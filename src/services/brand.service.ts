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
        const newBrand = await brand.create({
            data: input
        })
        return newBrand
    } catch (err: any) {
        throw new Error(err)
    }
}

export const removeBrand = async (brand_id: number) => {
    try {
        const removedBrand = await brand.delete({
            where: { id: brand_id }
        })
        return removedBrand
    } catch (err: any) {
        throw new Error(err)
    }
}
