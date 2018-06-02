const express = require("express")
const mysql = require("mysql")
const router = express.Router()

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  database: 'test_mysql'
})

function getConnection() {
    return pool
}

router.get('/users', (req, res) => {

  console.log("Fetching all users")
  const queryString = "SELECT * FROM users"

  getConnection().query(queryString, (err, rows, fields) => {
    
    if (err) {
      console.log("Failed to query for users")
      res.sendStatus(500)
      res.end()
      return
    }

    console.log("I think we fected users successfully")

    const users = rows.map((row) => {
      return {firstName: row.first_name, lastName: row.last_name}
    })

    res.json(users)
  })
})
  
router.get('/user/:id', (req, res) => {
  console.log("Fetching user with id: " + req.params.id)

  const uesrId = req.params.id
  const queryString = "SELECT * FROM users WHERE id = ?"

  getConnection().query(queryString, [uesrId], (err, rows, fields) => {

    if (err) {
      console.log("Failed to query for users: " + err)
      res.sendStatus(500)
      res.end()
      return
    }

    console.log("I think we fected users successfully")
    res.json(rows)
  })
})
  
router.post('/user_create', (req, res) => {
  console.log("Trying to create a new user....")

  console.log("First Name:" + req.body.create_first_name)
  const firstName = req.body.create_first_name
  const lastName = req.body.create_last_name

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
  getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {

    if (err) {
      console.log("Failed to insert new user: " + err)
      res.sendStatus(500)
      return
    }

    console.log("Inserted a new user with id: " + results.insertedId)
    res.end()

  })

  res.end()
})

module.exports = router