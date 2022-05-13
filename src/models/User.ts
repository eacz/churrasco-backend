import { model, Schema } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password?: string
  lastLogin: Date
  role: string
  active: boolean
  firstName: string
  lastName: string
  birthday: Date
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: { type: Date, default: Date.now() },
  role: { type: String, default: 'user' },
  active: { type: Boolean, default: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date },
})

const User = model<IUser>('User', userSchema)
export default User
