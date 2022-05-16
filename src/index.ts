import dotenv from 'dotenv'
import express from 'express'
import jwt from 'jsonwebtoken'
import connectDB from './config/db'
import mainRouter from './routes'
import cors from 'cors'
import { IUser } from './models/User'
dotenv.config()

const app = express()
const port = process.env.PORT || 4000
connectDB()
// TODO: mover esto a un archivo de definicion .d.ts
declare module 'jsonwebtoken' {
  export interface JWTPayload extends jwt.JwtPayload {
    _id: string
  }
}
declare global {
  namespace Express {
    interface Request {
      user?: IUser | null
    }
  }
}

// configure cors
//const whitelist = [process.env.FRONTEND_URL || '']

//if (process.env.NODE_ENV === 'development') {
//  app.use(cors())
//} else {
//  app.use(cors({ origin: whitelist }))
//}
app.use(cors())

app.use(express.json())
app.use('/api', mainRouter)

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
