import { object, string, TypeOf } from "zod"

export const addBrandSchema = object({
    body: object({
        name: string({ required_error: 'Brand name is required' })
    })
})

export interface BrandInput {
    name: string
}

export type AddBrandInput = TypeOf<typeof addBrandSchema>
