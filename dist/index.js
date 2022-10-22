"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const process_1 = require("process");
const connexionBd_1 = __importDefault(require("./connexionBd/connexionBd"));
//
const port = process_1.env.PORT || process_1.env.PORT_DEV;
//
const app = (0, express_1.default)();
//
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
//
connexionBd_1.default.connexionBdDev();
//
app.use("/", (req, res) => {
    res.status(200).json({ message: "BIENVENU DANS NOTRE API" });
});
const server = http_1.default.createServer();
server.on("request", app);
server.listen(port, () => {
    console.log(`Server at started on : ${port}`);
});
