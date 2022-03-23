import { object, number, TypeOf, date } from "zod";

export const createBookingSchema = object({
  body: object({
    carId: number({
      required_error: "Car Id is required",
    }),
    start: date({
      required_error: "start Date is required",
    }),
    end: date({
      required_error: "end Date is required",
    }),
  }),
});

export interface BookingInput {
  carId: Number;
  start: Date;
  end: Date;
}

export type CreateBookingInput = TypeOf<typeof createBookingSchema>;
