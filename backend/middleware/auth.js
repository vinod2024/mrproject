const isAuthorise = (req, res, next) =>  {
  
  try{
    if( !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearrer') ||
        !req.headers.authorization.split(' ')[1]){
          return res.status(422).send({
            msg: 'Please provide token'
          });
    }
    next()
  }
  
  catch(error){
    console.log(error.message);
    return res.status(404).send({
      msg: error.message
    })
  }
  
}

module.exports = {
  isAuthorise
};