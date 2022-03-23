import { PrismaClient } from ".prisma/client"
import { Request, Response } from "express"
import slugify from "slugify"
import { AddCarInput } from "../schemas/car.schema"
import { addCar, getAllCars } from "../services/car.service"

const { brand } = new PrismaClient()

export const getAllCarsHandler = async (req: Request, res: Response) => {
  const cars = await getAllCars()

  if (!cars) return res.sendStatus(404)

  return res.status(200).json({ success: true, cars })
}

export const addCarHandler = async (req: Request<{}, {}, AddCarInput["body"]>, res: Response) => {
  const { model, brandId } = req.body

  if (!brandId) return res.status(400).json({ success: false, message: "Brand id is required" })

  const carBrand = await brand.findUnique({
    where: { id: brandId }
  })

  if (!carBrand) return res.status(400).json({ success: false, message: "Invalid brand id" })

  const slug = slugify(carBrand.name.concat(` ${model}`), { lower: true })

  const car = await addCar({ ...req.body, slug })

  if (!car) return res.sendStatus(404)

  return res.status(200).json({ success: true, car })
}
