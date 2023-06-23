

exports.getDecodedOAuthJwtGoogle = async token => {

    const CLIENT_ID_GOOGLE = token.clientId;
      const client = new OAuth2Client(CLIENT_ID_GOOGLE)
  
      client.verifyIdToken({
        idToken: token.credential,
        audience: CLIENT_ID_GOOGLE,
      }).then(res=>{
        return res;
      }).catch(err=>{
        return { status: 500, data: err }
      });
  }