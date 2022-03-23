import { Request, Response } from "express"
import { getAllBrands } from "../services/brand.service"

export const getAllBrandsHandler = async (req: Request, res: Response) => {
    const brands = await getAllBrands()

    if (!brands) return res.sendStatus(404)

    return res.status(200).json({ success: true, brands })
}
