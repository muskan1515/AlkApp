module.exports={
    Enter:{
    hello:()=> "Hello",
    greet:({name})=>`hello how are you ${name}`
    },
    Exit:{
        bye:()=>"Bye",
        exiting:({name})=>`Come back soon ${name}!`
    },
    createUser:({name})=>"User account created!"

}