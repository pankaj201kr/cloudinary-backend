const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./route/userRoute")
const cors = require("cors")

require("dotenv")
    .config();

//Connect to database

mongoose.connect("mongodb://localhost:27017/cloudinary", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("connected to db"))
    .catch((err) => console.log(err))

process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use("/", userRoutes);

app.listen(process.env.PORT, function () {
    console.log(`App running! ${process.env.PORT}`);
});