// import library
import { port } from "./config.js";
import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
