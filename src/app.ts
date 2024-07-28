import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import routes from "./app/routes"

const app: Application = express();

app.use(cors({ credentials: true }));
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;