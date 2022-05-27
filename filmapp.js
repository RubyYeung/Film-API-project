const express = require("express")
const filmRoute = require("./filmroute")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Book
app.use('/', filmRoute)
//Customer
//app.use('/customer', customerRoute)

const listener = app.listen(process.env.PORT || 10888, () => {
  console.log(`Server is ready at ${listener.address().port}`)
})