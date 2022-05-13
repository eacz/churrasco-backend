import { IUser } from './models/User';
import jwt from 'jsonwebtoken';

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