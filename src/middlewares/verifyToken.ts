import { NextFunction, Request, Response } from 'express'
import jwt, { JWTPayload } from 'jsonwebtoken'
import User from '../models/User'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['auth-token']
  const secretKey = process.env.SECRET_KEY || ''
  if (!token || typeof token === 'object') {
    return res.status(401).json({ msg: "You're not authorized to access to this resource" })
  }
  try {
    const { _id } = jwt.verify(token, secretKey) as JWTPayload
    const user = await User.findById(_id).select('-password')
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ msg: "You're not authorized to access to this resource" })
  }
}

export default verifyToken
