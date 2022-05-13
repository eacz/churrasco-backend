import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import { checkIsEmail } from '../utils'
import jwt, { JWTPayload } from 'jsonwebtoken'
import { createHash } from 'crypto'

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  const isEmail = checkIsEmail(username)

  try {
    let user
    if (isEmail) {
      user = await User.findOne({ email: username })
    } else {
      user = await User.findOne({ username })
    }
    if (!user) return res.status(404).json({ ok: false, msg: "The user doesn't exists" })

    if (!user.active || user.role !== 'admin') return res.status(404).json({ ok: false, msg: 'Unathorized user' })

    const hashedPassword = createHash('sha256', { encoding: 'utf-8' }).update(password).digest('hex')

    if (hashedPassword !== user.password) return res.status(401).json({ ok: false, msg: 'Invalid credentials' })

    const payload: JWTPayload = { _id: user._id.toString() }

    const token = jwt.sign(payload, process.env.SECRET_KEY || '', { expiresIn: 3600 })

    user.password = undefined
    return res.json({ ok: true, user, token })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ ok: false, msg: 'Something went wrong' })
  }
}
