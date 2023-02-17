const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const categoriesRoutes = require('./routes/category')

const multer = require('multer')

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("connected"))
    .catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'image')
    }, filename: (req, file, cb) => {
        cb(null, 'image.jpeg')
    }
})
//configuration
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('file has been uploaded')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoriesRoutes)

app.listen("6000", () => {
    console.log("Backend is running..");
})