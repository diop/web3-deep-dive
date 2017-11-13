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

app.use(bodyParser.json())

const functionNames = [
  'eth.getGasPrice',
  'eth.getAccounts',
  'eth.getBlockNumber',
  'eth.net.getId',
  'eth.net.isListening',
  'eth.net.getPeerCount',
  'eth.accounts.hashMessage',
  'utils.randomHex',
  'utils.sha3',
  'utils.keccak256',
  'utils.isHex',
  'utils.isHexStrict',
  'utils.isAddress',
  'utils.toChecksumAddress',
  'utils.checkAddressChecksum',
  'utils.toHex',
  'utils.hexToNumberString',
  'utils.hexToNumber',
  'utils.numberToHex',
  'utils.hexToUtf8',
  'utils.hexToAscii',
  'utils.utf8ToHex',
  'utils.asciiToHex',
  'utils.hexToBytes',
  'utils.bytesToHex',
  'utils.toWei',
  'utils.fromWei',
  'utils.toWei',
  'utils.unitMap',
  'utils.padLeft',
  'utils.padRight',
  'utils.toTwosComplement',
]

app.get('/', (request, response) => {
  response.render('index', {functionNames})
})

app.post('/ajax-request', (request, response) => {
  const { functionName, parameters } = request.body

  console.log('server receiving ajax-request')
  console.log('    functionName:', functionName)
  console.log('    parameters:', parameters)

  const theFunction = functionName.split('.')
    .reduce((acc, part) => acc[part], web3)

  if (!(theFunction instanceof Function)) {
    response.send(JSON.stringify(theFunction))
  } else {
    const result = theFunction.apply(null, JSON.parse(parameters))

    if (result.then) {
      result.then(promiseResult => {
        response.send(JSON.stringify(promiseResult))
      })
    } else {
      response.send(JSON.stringify(result))
    }
  }
})

app.listen(port, () => {
  console.log(`Ethereum Dapp listening on http://localhost:${port}...`)
})
