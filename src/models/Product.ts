import { model, Schema, Types } from 'mongoose'

export interface IProduct {
  SKU: string
  code: number
  name: string
  description: string
  pictures: string[]
  price: boolean
  currency: string
}

const productSchema = new Schema({
  SKU: { type: String, required: true, unique: true },
  code: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  pictures: { type: [String], default: [] },
  price: { type: Number, default: 0 },
  currency: { type: String, default: '$' },
})

const Product = model<IProduct>('Product', productSchema)
export default Product
