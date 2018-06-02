// load our app server using express somehow...

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('./public'))

app.use(morgan('combined'))

const userRouter = require('./routes/user.js')
app.use(userRouter)

app.get('/', (req, res) => {
  console.log("Responding to root route")
  res.send("Hello from Route...")
})

// localhost:9999
app.listen(9999, ()=> {
  console.log("Server is up and listening on 9999...");
})
