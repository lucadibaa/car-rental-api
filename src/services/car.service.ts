import { PrismaClient } from "@prisma/client"
import { CarInput } from "../schemas/car.schema"

const { car } = new PrismaClient()

export const getAllCars = async () => {
  try {
    const cars = await car.findMany()
    return cars
  } catch (err: any) {
    throw new Error(err)
  }
}

export const addCar = async (input: CarInput) => {
  try {
    const newCar = await car.create({
      data: input
    })
    return newCar
  } catch (err: any) {
    throw new Error(err)
  }
}

export const removeCar = async (car_id: number) => {
  try {
    const removedCar = await car.delete({
      where: { id: car_id }
    })
    return removedCar
  } catch (err: any) {
    throw new Error(err)
  }
}
