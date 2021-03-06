import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import githubRouter from "routes/github-router";

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.listen({ port: process.env.PORT }, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/github", githubRouter);
