import { PrismaClient } from "@prisma/client"

const { car } = new PrismaClient()

export const getAllCars = async () => {
  try {
    const cars = await car.findMany()
    return cars
  } catch (err: any) {
    throw new Error(err)
  }
}
