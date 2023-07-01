const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const {Connection} = require('./db/Connection');
const authController=require('./Routes/Authetication');
const openaiRoutes=require('./Routes/openAi');
const { buildSchema } = require('graphql');
const dotenv=require('dotenv').config();

//graphql
const {graphqlHTTP}=require('express-graphql');
const schema = require('./graphQL/schema/schema');


const app=express();

const server=app.listen(8080,()=>{
    console.log('Server has started');
});

Connection();
app.use(cors(
    {
      'Access-Control-Allow-Origin': "*",
      'Access-Control-Allow-Headers': true,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    }
  ));
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/auth',authController);
app.use('/openAI',openaiRoutes);

// app.use('/graphql',graphqlHTTP({
//   schema: schema
//   ,
//   rootValue:{
//     hello:()=>"Helloworld",
//     greet:({name})=>`heelo ${name}`
//   },
//   graphiql:true}));


