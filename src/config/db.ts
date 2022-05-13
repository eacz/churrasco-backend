import mongoose from 'mongoose'
import dotenv from 'dotenv'
import process from 'process'
dotenv.config()

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.log('Error conneting to the database, please checkout the credentials')
    return process.exit(1)
  }
  try {
    await mongoose.connect(process.env.MONGO_URL, {})
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default connectDB
