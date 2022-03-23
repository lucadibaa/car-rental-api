import { PrismaClient } from ".prisma/client"
import { Request, Response } from "express"
import { AddBrandInput } from "../schemas/brand.schema"
import { addBrand, getAllBrands, removeBrand } from "../services/brand.service"

const { brand } = new PrismaClient()

export const getAllBrandsHandler = async (req: Request, res: Response) => {
    const brands = await getAllBrands()

    if (!brands) return res.sendStatus(404)

    return res.status(200).json({ success: true, brands })
}

export const addBrandHandler = async (req: Request<{}, {}, AddBrandInput["body"]>, res: Response) => {
    const brand = await addBrand(req.body)

    if (!brand) return res.sendStatus(404)

    return res.status(200).json({ success: true, brand })
}

export const removeBrandHandler = async (req: Request, res: Response) => {
    const { brand_id } = req.params

    const _brand = await brand.findUnique({
        where: { id: Number(brand_id) },
        include: { _count: true }
    })

    if (!_brand) return res.status(404).json({ success: false, message: "Invalid brand id" })

    if (_brand._count.cars !== 0) return res.status(400).json({ success: false, message: "Cannot delete a brand with cars" })

    const removedBrand = await removeBrand(Number(brand_id))

    return res.status(200).json({ success: true, removedBrand })
}
