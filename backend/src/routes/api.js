import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const TOKEN_SECRET = 'secret thing'

router.get('/heartbeat', async (req, res) => {
  res.json({ connection: 'true' })
})

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, index: true, required: true, trim: true }, //trim lecsapja a szóközt
  password: { type: String, select: false }, //false ha usert lekérjük, nem lesz benne a password
  gender: { type: String, select: false },
  email: { type: String, select: false },
  registeredAt: { type: Date, default: Date.now, select: false }
})

const characterSchema = new mongoose.Schema({
  buildName: { type: String },
  yourRace: { type: String },
  yourProf: { type: String },
  yourSpecs: { type: Array },
  yourBackstory: { type: String },
  createdAt: { type: Date, default: Date.now, select: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
})

const User = mongoose.model('User', userSchema)

const Character = mongoose.model('Character', characterSchema)

router.post('/register', async (req, res, next) => { //postmannél /api/register-t kell írni
  const { username, password, gender, email } = req.body
  const user = await User.findOne({ username }) //megnézni, hogy létezik-e már ilyen nevü felhasználó
  if (user) {
    next('User already exists')
  } else {
    const hashed = await bcrypt.hash(password, 8)
    const createdUser = await User.create({ username, password: hashed, gender, email })
    res.json({ id: createdUser.id })
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).select('+password')

  if (!user) {
    next('No such user')
  } else {
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      next('Wrong password')
    } else {
      const token = await jwt.sign({ userId: user.id }, TOKEN_SECRET, {
        expiresIn: '3h' //3 óra múlva lejár
      })
      res.cookie('auth', token, { httpOnly: true })
      res.json({ token })
    }
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('auth')
  res.end()
})

const authMW = async (req, res, next) => {
  //const token = req.headers?.authorization?.replace('Bearer ', '') //tokenre nevezi át a bearer-t
  const token = req.cookies.auth
  try {
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    req.user = userId
    next()
  } catch (err) {
    next(err)
  }
}

router.put('/user', authMW, async (req, res) => {
  if (req.body.option === "password") {
    const hashed = await bcrypt.hash(req.body.password, 8)
    const updated = await User.findByIdAndUpdate(req.user, { password: hashed })
    res.json(updated)
  } else if (req.body.option === "email") {
    const updated = await User.findByIdAndUpdate(req.user, { email: req.body.email })
    res.json(updated)
  }
})

router.get('/allcharacters', authMW, async (req, res) => {
  const characters = await Character.find({})
  res.json(characters)
})

router.get('/character', authMW, async (req, res, next) => {
  try {
    const characters = await Character.find({ createdBy: req.user })
    next()
    res.json(characters)
  } catch (err) {
    next("Need to login")
  }
})

router.post('/character', authMW, async (req, res) => {
  const { yourRace, yourProf, yourSpecs, yourBackstory, buildName } = req.body
  const created = await Character.create({ yourRace, yourProf, yourSpecs, yourBackstory, buildName, createdBy: req.user })
  res.json(created)
})

router.delete('/character/:id', authMW, async (req, res) => {
  const deleted = await Character.findByIdAndDelete(req.params.id)
  res.json(deleted)
})

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, path.join(path.dirname('.'), 'upload')) //dirname '.' mert a kód a backendből fut
  },
  filename: (req, file, next) => {
    /*if(file.mimetype !== 'image/png'){
      next('only images allowed')
    }*/
    next(null, req.user + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  },
})

const upload = multer({
  storage
})

router.post('/upload', authMW, upload.single('example'), (req, res) => { // 'example' a fájlnév és single darabot töltünk fel
  const location = '/api/files/' + req.file.filename
  res.json(location)
})

router.get('/user', authMW, (req, res) => {
  res.json(req.user)
})

router.get('/csrf-protection', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

export default router
