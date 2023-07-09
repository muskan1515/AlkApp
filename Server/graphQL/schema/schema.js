const {buildSchema} =require('graphql');


module.exports =  buildSchema(`

type Enter{
   hello:String,
   greet(name:String):String
},
type Exit{
    bye:String,
    exiting(name:String):String
}

input User{
    name:String!
}
type Query{
    Enter:Enter,
    Exit:Exit
}

type Mutation{
    createUser (UserInput:User):String
}

type schema{
    query:Query,
    mutation:Mutation
}

`);