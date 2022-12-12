"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_authorization_1 = __importDefault(require("../authorizations/auth.authorization"));
const role_admin_authorization_1 = __importDefault(require("../authorizations/role.admin.authorization"));
const _in_route_1 = __importDefault(require("../sign.route/_in/_in.route"));
const admin_routes_1 = __importDefault(require("./admin.routes/admin.routes"));
const client_routes_1 = __importDefault(require("./client.routes/client.routes"));
const compteBloque_routes_1 = __importDefault(require("./compteBloque.routes/compteBloque.routes"));
const demandeDepense_routes_1 = __importDefault(require("./demandeDepense.routes/demandeDepense.routes"));
const depense_routes_1 = __importDefault(require("./depense.routes/depense.routes"));
const detailPiece_routes_1 = __importDefault(require("./detailTypePiece.routes/detailPiece.routes"));
const detailTypePiece_routes_1 = __importDefault(require("./detailTypeKilo.routes/detailTypePiece.routes"));
const employer_routes_1 = __importDefault(require("./employer.routes /employer.routes"));
const etatFinancier_routes_1 = __importDefault(require("./etatFinancier.routes/etatFinancier.routes"));
const facture_routes_1 = __importDefault(require("./facture.routes/facture.routes"));
const infoKilo_routes_1 = __importDefault(require("./infoKilo.routes/infoKilo.routes"));
const infoPiece_routes_1 = __importDefault(require("./infoPiece.routes/infoPiece.routes"));
const linge_routes_1 = __importDefault(require("./linge.routes/linge.routes"));
const typeLinge_routes_1 = __importDefault(require("./typeLinge.routes/typeLinge.routes"));
exports.default = (app) => {
    //HOME
    app.get("/", (req, res) => {
        res.status(200).json({
            message: ".ECM...BIENVENU...SSL.",
            secure: req.secure,
            protocole: req.protocol,
        });
    });
    //RESSOURCES
    app.use("/sign", _in_route_1.default);
    app.use("/admins", auth_authorization_1.default, role_admin_authorization_1.default, admin_routes_1.default);
    app.use("/clients", auth_authorization_1.default, client_routes_1.default);
    app.use("/compteBloquers", auth_authorization_1.default, role_admin_authorization_1.default, compteBloque_routes_1.default);
    app.use("/demandeDepenses", auth_authorization_1.default, demandeDepense_routes_1.default);
    app.use("/depenses", auth_authorization_1.default, role_admin_authorization_1.default, depense_routes_1.default);
    app.use("/detailTypePieces", auth_authorization_1.default, detailPiece_routes_1.default);
    app.use("/detailTypeKilo", auth_authorization_1.default, detailTypePiece_routes_1.default);
    app.use("/employers", auth_authorization_1.default, employer_routes_1.default);
    app.use("/etatFinancier", auth_authorization_1.default, role_admin_authorization_1.default, etatFinancier_routes_1.default);
    app.use("/factures", auth_authorization_1.default, role_admin_authorization_1.default, facture_routes_1.default);
    app.use("/infosKilo", auth_authorization_1.default, infoKilo_routes_1.default);
    app.use("/infosPieces", auth_authorization_1.default, infoPiece_routes_1.default);
    app.use("/linges", auth_authorization_1.default, linge_routes_1.default);
    app.use("/typesLinges", auth_authorization_1.default, typeLinge_routes_1.default);
    //NOT FOUND
    app.use("*/**", (req, res) => {
        res.status(404).json({ message: "Cette ressource n'éxiste pas !" });
    });
};
