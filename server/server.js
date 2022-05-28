// require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')

//MIDDLE WARE
app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '../client')))
app.use(express.static(path.join(__dirname, '../maze')))



// ENDPOINTS
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/signup.html'))
})

const {getBoardgames, createPopUp, createPopUpEx, sortByTitle, sortByGenre, sortByPublisher, sortByYear, clearTable, addToTable, getTableTopGames, tableCounter, requestGame, getRequests, loginCheck, createUser, getExpansions, removeTableGame, getExpansionsId, addPackToTable, getOneBoardgame, getOneExpansion, search, sortByHayden} = require('./controller.js')


app.get('/api/boardgames', getBoardgames)
app.get('/api/popup/:id', createPopUp)
app.get('/api/popupEx/:id', createPopUpEx)
app.get('/api/sortbytitle', sortByTitle)
app.get('/api/sortbygenre', sortByGenre)
app.get('/api/sortbypublisher', sortByPublisher)
app.get('/api/sortbyyear', sortByYear)
app.get('/api/sortbyhayden', sortByHayden)
app.post('/api/table', addToTable)
app.get('/api/tabletop', getTableTopGames)
app.delete('/api/tabletop/:id', clearTable)
app.put('/api/removetabletop', removeTableGame)
app.get('/api/counter', tableCounter)
app.post('/api/request', requestGame)
app.get('/api/request', getRequests)
app.get('/api/expansions', getExpansions)
app.get('/api/expansions/:id', getExpansionsId)
app.post('/api/getexpansion', getOneExpansion)
app.post('/api/getboardgame', getOneBoardgame)
app.post('/api/getallgames', addPackToTable)
app.post('/api/search', search)

app.get('/api/users', loginCheck)
app.post('/api/users', createUser)


// SERVER
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})