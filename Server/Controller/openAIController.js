const axios=require('axios');
const {Configuration,OpenAIApi}=require('openai');
const dotenv=require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
const openai = new OpenAIApi(configuration);

exports.getImages=(req,res)=>{
    const description=req.body.description;
    if (!configuration.apiKey) {
        console.log("error");
        return;
    }
    openai.createImage({
        prompt: description,
        n: 4,
        size: "1024x1024",
      }).then(response=>{
        res.send(response.data.data);
      }).catch(err=>{
        res.status(400).send(err);
      });
};

exports.getTexts=(req,res)=>{
    const description=req.body.description;
    if (!configuration.apiKey) {
        console.log("error");
        return;
    }
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: description,
        max_tokens: 500,
        temperature: 0,
      }).then(response=>{
        res.send(response.data.choices[0].text);
      }).catch(err=>{
        console.log(err);
        res.status(400).send(err);
      });
};
