import { Router } from 'express'
import { body } from 'express-validator'
import { login } from '../controllers/authController'
import validateBodyFields from '../middlewares/validateBodyFields'

const router = Router()

router.post(
  '/login',
  [
    body('username').isString().withMessage('Username required'),
    body('password').isString().withMessage('Password required'),
    validateBodyFields,
  ],
  login
)

export default router
