import { NextFunction, Request, Response } from 'express'
import FormData from 'form-data'
import { createReadStream } from 'fs'
import { v4 as uuid } from 'uuid'
import cloudinary from '../apis/cloudinary'
import Product from '../models/Product'
import { FileCloudinary } from '../interfaces/cloudinary'

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find()
    return res.json({ ok: true, products })
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Something went wrong' })
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  const { name, code, price, description, currency } = req.fields || {}
  // validations
  if (!name) {
    return res.status(400).json({ ok: false, msg: 'The name of the product is required' })
  }
  if (!code) {
    return res.status(400).json({ ok: false, msg: 'The code of the product is required' })
  }

  try {
    const productExists = await Product.count({ code })
    if (productExists) return res.status(409).json({ ok: false, msg: 'Duplicated code' })
  } catch (error) {
    return res.status(500).json({ ok: false, msg: 'Something went wrong' })
  }

  // upload image to cloudinary
  let pictureURL = ''
  if (req.files?.pictures) {
    let file: any = req.files?.pictures
    file = createReadStream(file.path)
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'churrasco')
    data.append('cloud_name', 'dbyrp5tgh')
    try {
      const response = await cloudinary.post<FileCloudinary>('', data)
      pictureURL = response.data.secure_url
    } catch (error) {
      console.log({ error })
    }
  }

  // create product

  const SKU = uuid()
  const pictures = pictureURL ? [pictureURL] : []
  const product = new Product({
    name,
    SKU,
    code,
    price,
    description,
    currency,
    pictures,
  })
  try {
    await product.save()
    return res.status(201).json({ ok: true, product })
  } catch (error) {
    console.log(error)
  }
}
