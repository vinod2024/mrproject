const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");

// connection.
// const db = require("./config/dbConnection");  // mysql
const sequelize = require("./config/dbConnection"); // sequelize


const PORT = process.env.PORT || 5000;

const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');
const webRouter = require('./routes/webRoute');


// varifyMail


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/* app.use(express.json());
app.use(express.urlencoded({ extended: false })); */


const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Routing start.
app.use('/api', userRouter);
app.use('/api/post', postRouter);
app.use('/', webRouter);


app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';
  res.status(err.statusCode).json({
    message: err.message
  });
});

// Sync after models loaded
/* sequelize
  .sync({ alter: false }) // ⚠️ use only in development
  .then(() => {
    console.log("Tables synced");
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} successfully.`);
    });
  })
  .catch((err) => {
    console.error("DB Sync Error:", err);
  }); */

app.listen(PORT, ()=>{
  console.log(`Server running on ${PORT} successfully.`);
})