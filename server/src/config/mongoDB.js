import dotenv from "dotenv";
import mongoose from "mongoose"

dotenv.config();

mongoose
    .connect(process.env.dbURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        })
    .then((result) => console.log("Connected to MongoDB:"))
    .catch((err) => console.log(err))

export { mongoose }