const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/paytm";

mongoose.connect(mongoUrl)
    .then(() => {
        app.listen(3000, () => {
            console.log("Backend listening on port 3000");
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
        process.exitCode = 1;
    });