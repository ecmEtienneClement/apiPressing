"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const process_1 = require("process");
const connexionBd_1 = __importDefault(require("./connexionBd/connexionBd"));
const routeur_routes_1 = __importDefault(require("./routes/routeur.routes"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
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
(0, routeur_routes_1.default)(app);
try {
    const cert = fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "cert", "cert.pem"));
    const key = fs_1.default.readFileSync(path_1.default.join(__dirname, "ssl", "key", "key.pem"));
    const server = https_1.default.createServer({ cert: cert, key: key });
    server.on("request", app);
    server.listen(port, () => {
        console.log(`Server at started on : ${port}`);
    });
}
catch (error) {
    console.log(error);
}
