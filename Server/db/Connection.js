const mongoose =require('mongoose');
const url='mongodb+srv://muskankushwah85:Muskan1515@cluster0.mxnxlvn.mongodb.net/';

module.exports.Connection=function(){
    mongoose.connect(url).
    then(res=>{
        console.log("Connection done successfully");
    }).
    catch(err=>{
        console.log("While connectiong to database we have :",err);
    })
};
