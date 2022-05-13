import { Router } from 'express'
import authRouter from './authRoutes'
import productRouter from './productRoutes'

const mainRouter = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/products', productRouter)

export default mainRouter
