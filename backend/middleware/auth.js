const jwt = require("jsonwebtoken");

const isAuthorise = (req, res, next) =>  {
  
  try{
    if( !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]){
          return res.status(422).send({
            msg: 'Please login first.'
            // msg: 'Please provide token'
          });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);
    req.tokenData = decoded;

    next()
  }
  
  catch(error){
    console.log(error.message);
    /* return res.status(404).send({
      msg: error.message
    }) */

      // 2. Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        code: "TOKEN_EXPIRED",
        msg: "Session expired. Please login again."
      });
    }

    // 3. Token invalid
    return res.status(401).json({
      success: false,
      code: "TOKEN_INVALID",
      msg: "Invalid authentication token"
    });
  }
  
}

module.exports = {
  isAuthorise
};