require('dotenv').config()
require('./config/database');

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const PORT = process.env.PORT || 3001

const app = express()

app.use(express.json()) //req.body
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'build')))
app.use('/', require('./controllers/api/todos'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/api/test', (req, res) => {
    res.json({'eureka': 'you have found it'})
})

app.listen(PORT, () => {
    console.log(`I am listening on ${PORT}`)
})