// require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

//MIDDLE WARE
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../client')))


// ENDPOINTS
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/game-night.html'))
})

const {getBoardgames, createPopUp, sortByTitle, sortByGenre, sortByPublisher, sortByYear, clearTable, addToTable, getTableTopGames, tableCounter} = require('./controller.js')


app.get('/api/boardgames', getBoardgames)
app.get('/api/popup/:id', createPopUp)
app.get('/api/sortbytitle', sortByTitle)
app.get('/api/sortbygenre', sortByGenre)
app.get('/api/sortbypublisher', sortByPublisher)
app.get('/api/sortbyyear', sortByYear)
app.post('/api/table', addToTable)
app.get('/api/tabletop', getTableTopGames)
app.delete('/api/tabletop/:id', clearTable)
app.get('/api/counter', tableCounter)


// SERVER
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})