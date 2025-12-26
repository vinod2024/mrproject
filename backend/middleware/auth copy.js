const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const isAuthorise = (req, res, next) =>  {
  
  try{
    if( !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]){
          return res.status(422).send({
            msg: 'Please provide token'
          });
    }

    // check auth.
    const authToken = req.headers.authorization.split(' ')[1];
    const tokenData = jwt.verify(authToken, JWT_SECRET);

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