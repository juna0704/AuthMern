import express, { urlencoded } from "express";
import dotenv from "dotenv";
import router from "./routes/goalRoute.js";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import route from "./routes/userRoute.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

connectDB();

app.use("/api", router);
app.use("/api/users", route);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is runnnig at port ${port}`);
});
