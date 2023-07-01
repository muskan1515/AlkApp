const {buildSchema} =require('graphql');

module.exports = buildSchema({
    Query:({
        hello:String,
        greet(String){String}
    }),
});