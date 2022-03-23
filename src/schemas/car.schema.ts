import { number, object, string, TypeOf } from "zod"

export const addCarSchema = object({
    body: object({
        model: string({ required_error: 'Car name is required' }),
        brandId: number({ required_error: 'Brand id is required' })
    })
})

export interface CarInput {
    model: string
    brandId: number
    slug: string
}

export type AddCarInput = TypeOf<typeof addCarSchema>
