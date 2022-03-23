import { PrismaClient } from "@prisma/client";
import { BookingInput } from "../schemas/booking.schema";

const { rental } = new PrismaClient();

export const createRental = async (input: BookingInput, userId: Number) => {
  try {
    const Booking = await rental.create({
      data: { ...input, customer: userId },
    });
    return Booking;
  } catch (err: any) {
    throw new Error(err);
  }
};
