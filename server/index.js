const express = require("express");
const app = express();
const cors = require("cors");

const authRouter = require("./routes/auth");
const antiqueRouter = require("./routes/antique");
const {connectDB} = require("./database/connect")

connectDB().catch((error)=>{
  console.log(error)
  process.exit(1)
})

const checkValidation = require("./middleware/requireAuth");
require("dotenv").config();


const port = 8000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/", authRouter);
app.use("/api/v1/", checkValidation, antiqueRouter);
app.get("/", async (req, res) => {
  res.send({ message: "Hello world" });
});

app.listen(8000, "0.0.0.0");
