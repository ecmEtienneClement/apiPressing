import http from "http";
import https from "https";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { env } from "process";
import ConnexionBd from "./connexionBd/connexionBd";
import routeurRoutes from "./routes/routeur.routes";
import path from "path";
import fs from "fs";

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

routeurRoutes(app);
try {
  const cert = fs.readFileSync(path.join(__dirname, "ssl", "cert", "cert.pem"));
  const key = fs.readFileSync(path.join(__dirname, "ssl", "key", "key.pem"));
  const server = https.createServer({ cert: cert, key: key });
  server.on("request", app);
  server.listen(port, () => {
    console.log(`Server at started on : ${port}`);
  });
} catch (error) {
  console.log(error);
}
//
/*
const server = http.createServer();
server.on("request", app);
server.listen(port, () => {
  console.log(`Server at started on : ${port}`);
});
*/
