import { Router } from 'express'
import ExpressFormidable from 'express-formidable'
import { createProduct, getProducts } from '../controllers/productController'
import verifyToken from '../middlewares/verifyToken'

const router = Router()

router.get('/', [verifyToken], getProducts)
router.post(
  '/',
  [
    ExpressFormidable(),
    verifyToken,
  ],
  createProduct
)

export default router
