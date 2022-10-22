import http from "http";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { env } from "process";
import ConnexionBd from "./connexionBd/connexionBd";

//
const port = env.PORT || env.PORT_DEV;
//
const app = express();
//
app.use(cors());
app.use(bodyParser.json());
//
ConnexionBd.connexionBdDev();
//
app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "BIENVENU DANS NOTRE API" });
});
const server = http.createServer();
server.on("request", app);
server.listen(port, () => {
  console.log(`Server at started on : ${port}`);
});
