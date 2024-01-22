const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes/todoRoutes")
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Mongo DB connected...'))
    .catch((err) => console.log(err));
app.use("/api", routes)



app.listen(PORT, () => (console.log(`Listening at ${PORT}
`)));