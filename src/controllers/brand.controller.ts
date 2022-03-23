import { Request, Response } from "express"
import { AddBrandInput } from "../schemas/brand.schema"
import { addBrand, getAllBrands } from "../services/brand.service"

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
