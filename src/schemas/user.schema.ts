import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    phoneNumber: string({
      required_error: "Phone number is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password must be at least 6 characters losng"),
  }),
})

export interface UserInput {
  name: string
  email: string
  phoneNumber: string
  password: string
}

export type CreateUserInput = TypeOf<typeof createUserSchema>
