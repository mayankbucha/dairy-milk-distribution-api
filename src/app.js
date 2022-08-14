const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

require('./db/mongoose')

const orderRouter = require('./router/order')

const app = express();

app.use(helmet());

app.use(express.json())

app.use(cors());

app.use(morgan('dev'));

app.use(orderRouter)

app.get('/', (req, res) => {
    res.send('Hello! Welcome to dairy distributor API');
});

module.exports = app