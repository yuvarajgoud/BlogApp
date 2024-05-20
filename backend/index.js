const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('./models/User')

const app = express();


const salt = bcrypt.genSaltSync(10)
const secretKey = process.env.SECRET_KEY

app.use(cors({credentials:true , origin:'http://localhost:5173'}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL)
.then( ()=> console.log("Database Connected"))

app.post('/register',async (req,res)=>{
  const {username,password} = req.body
  try{
    const userDoc =  await User.create({username,password:bcrypt.hashSync(password,salt)})
    res.json(userDoc)
  } catch(err){
    res.status(400).json(err)
  }
})

app.post('/login', async (req,res)=>{
  const {username,password} = req.body
  const userDoc = await User.findOne({username})
  const passOk = bcrypt.compareSync(password,userDoc.password)
  if(passOk){
    jwt.sign({username,id:userDoc._id} , secretKey, (err,token) =>{
      if(err) throw err
      res.cookie('token',token).json({
        id:userDoc._id,
        username
      })
    })
  } else {
    res.status(400).json("Wrong credentials")
  }
})

app.get('/profile',(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token,secretKey,{},(err,info)=>{
    if(err) throw err;
    res.json(info)
  })
})

app.post('/logout',(req,res)=>{
  res.cookie('token','').json('ok')
})
app.listen(8000)
