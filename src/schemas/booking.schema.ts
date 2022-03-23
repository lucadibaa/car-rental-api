import { object, number, TypeOf, date } from "zod"

export const createBookingSchema = object({
  body: object({
    carId: number({
      required_error: "Car Id is required",
    }),
    startDate: date({
      required_error: "start Date is required",
    }),
    endDate: date({
      required_error: "end Date is required",
    }),
  }),
})

export interface BookingInput {
  carId: Number
  startDate: Date
  endDate: Date
}

export type CreateBookingInput = TypeOf<typeof createBookingSchema>
