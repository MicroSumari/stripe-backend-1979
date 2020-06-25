const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const env = require('./Variables');
console.log(env)

const app = express();
app.use(helmet());
app.use(compression())
app.use(morgan('combined'));
const port = process.env.PORT || 5000;
 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASSWORD}@cluster0-34wi6.mongodb.net/${env.MONGO_DATABASE}?retryWrites=true&w=majority`;
//const uri1 = 'mongodb+srv://Irfan:abccba123@cluster0-34wi6.mongodb.net/Tokens?retryWrites=true&w=majority';

console.log(uri);
//console.log(uri1) 
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
 
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
 
const router = require('./route');
app.use('/',router);
 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});