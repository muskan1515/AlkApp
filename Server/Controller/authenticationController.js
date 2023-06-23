const axios=require('axios');
const {OAuth2Client}=require('google-auth-library');
const {ObjectId} =require('mongoose');

const User = require('../Modal/User');

function decodeCredentials(token) {
  const client = new OAuth2Client(token.clientId);
  return new Promise((resolve, reject) => {
    client
      .verifyIdToken({
        idToken: token.credential,
        audience: token.clientId,
      })
      .then((ticket) => {
        const payload = ticket.getPayload();
        const userId = payload.sub;
        const email = payload.email;
        const name=payload.name;
        const image=payload.picture;
        if(payload.email_verified){
          resolve({ userId, name,email,image });
        }
        else{
          resolve({});
        }
        
      })
      .catch((error) => {
        console.error('Error decoding credentials:', error);
        reject(error);
      });
  });
}

exports. getGoogleLogin=(req,res)=>{
 decodeCredentials(req.body).then(result=>{
  const userId=result.userId;

  User.findOne({subId:userId}).
  then(result=>{
    res.status(200).send(result);
  }).
  catch(err=>{
    res.status(400).send(err);
  });

 }).
 catch(err=>{
  res.status(400).send(err);
 });
};

exports.getGoogleSignup=(req,res)=>{
      decodeCredentials(req.body).then(result=>{
        const email=result.email;
        User.find({email:email}).then(data=>{
          if(data){
            res.status(400).send(err);
          }
          else {
            const userData= new User({
              subId:result.userId,
              name:result.name,
              email:result.email,
              imgURL:result.image
            });
            userData.save().
            then(result=>{
              res.status(200).send(result);
            }).
            catch(err=>{
              res.status(400).send(err);
            });
          }
        }).catch(err=>{
          res.status(400).send(err);
        });
       }).
       catch(err=>{
        res.status(400).send(err);
       });
};

exports. getLogin=(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
  User.find({email:email}).then(result=>{
    if(!result){
      res.status(400).send(err);
    }
    else{
        User.find({email:email}).then(data=>{
          if(data[0].password==password){
           res.status(200).send("ok");
          }
          else if(data[0].password!=password){
          res.status(400).send("Wrong Password");
          }
          else{
            User.updateOne({email:email},{$set:{password:password}}).then(ans=>{
              console.log(ans);
            }).catch(err=>{
              console.log(err);
            })
          }
        }).catch(err=>{
          res.status(400).send(err);
        });
      }
  }).catch(err=>{
    console.log(err);
    res.status(400).send(err);
  });
 };

 exports.getSignup=(req,res)=>{
  const email=req.body.email;
  const password=req.body.password;
  const name=email.split('@')[0];
  const img="https://th.bing.com/th/id/OIP.xqbTM0vtmFEFX88da1iEwQHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.1&pid=1.7";

  User.find({email:email}).then(result=>{
    if(result.length==0){
      const user=new User({
        name:name,
        email:email,
        password:password,
        imgURL:img
      });
      user.save().then(success=>{
        res.status(200).send("OK");
      }).catch(err=>{
        res.status(400).send(err);
      });
    }
    else{
      res.status(400).send("Already Exists");
    }
  }).catch(err=>{
    res.status(400).send(err);
  });
};