import { Request, Response } from "express";
import { CreateBookingInput } from "../schemas/booking.schema";
import { createRental } from "../services/booking.service";

export const createBooking = async (
  req: Request<{}, {}, CreateBookingInput["body"]>,
  res: Response
) => {
  const user = res.locals.user._id;
  try {
    const booking = await createRental(req.body, user);
    return res.status(201).json({ success: true, booking });
  } catch (err: any) {
    return res.status(409).json({ success: false, error: err.message });
  }
};
