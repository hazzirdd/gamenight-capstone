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
  res.sendFile(path.join(__dirname, '../client/signup.html'))
})

const {getBoardgames, createPopUp, createPopUpEx, sortByTitle, sortByGenre, sortByPublisher, sortByYear, clearTable, addToTable, getTableTopGames, tableCounter, requestGame, getRequests, loginCheck, createUser, getExpansions, removeTableGame} = require('./controller.js')


app.get('/api/boardgames', getBoardgames)
app.get('/api/popup/:id', createPopUp)
app.get('/api/popupEx/:id', createPopUpEx)
app.get('/api/sortbytitle', sortByTitle)
app.get('/api/sortbygenre', sortByGenre)
app.get('/api/sortbypublisher', sortByPublisher)
app.get('/api/sortbyyear', sortByYear)
app.post('/api/table', addToTable)
app.get('/api/tabletop', getTableTopGames)
app.delete('/api/tabletop/:id', clearTable)
app.get('/api/removetabletop/:id', removeTableGame)
app.get('/api/counter', tableCounter)
app.post('/api/request', requestGame)
app.get('/api/request', getRequests)
app.get('/api/expansions', getExpansions)

app.get('/api/users', loginCheck)
app.post('/api/users', createUser)


// SERVER
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})