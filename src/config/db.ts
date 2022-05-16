import mongoose from 'mongoose'
import dotenv from 'dotenv'
import process from 'process'
dotenv.config()

const mongoURL =
  'mongodb://challenge:challenge@vps.churrasco.digital:27017/challenge?authSource=admin&directConnection=true&ssl=false'

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {})
    console.log('Connected to DB')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default connectDB
