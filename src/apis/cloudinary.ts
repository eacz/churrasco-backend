import axios from 'axios'

const cloudinary = axios.create({ baseURL: process.env.CLOUDINARY_URL })

export default cloudinary
