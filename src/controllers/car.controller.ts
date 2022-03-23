import { Request, Response } from "express"
import { getAllCars } from "../services/car.service"

export const getAllCarsHandler = async (req: Request, res: Response) => {
  const cars = await getAllCars()

  if (!cars) return res.sendStatus(404)

  return res.status(200).json({ success: true, cars })
}
