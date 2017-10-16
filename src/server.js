const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')

const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
  response.send('Live Ethereum Blockchain Data')
})

app.listen(port, () => {
  console.log(`Ethereum Dapp listening on http://localhost:${port}...`)
})
