import { Request, Response } from "express";
import authAuthorization from "../authorizations/auth.authorization";
import roleAdminAuthorization from "../authorizations/role.admin.authorization";
import singInRoute from "../sign.route/_in/_in.route";
import adminsRoutes from "./admin.routes/admin.routes";
import clientsRoutes from "./client.routes/client.routes";
import compteBloquersRoutes from "./compteBloque.routes/compteBloque.routes";
import demandeDepensesRoutes from "./demandeDepense.routes/demandeDepense.routes";
import depensesRoutes from "./depense.routes/depense.routes";
import detailPiecesRoutes from "./detailPiece.routes/detailPiece.routes";
import detailTypeKiloRoutes from "./detailTypeKilo.routes/detailTypePiece.routes";
import detailTypePiecesRoutes from "./detailTypePiece.routes/detailTypePiece.routes";
import employersRoutes from "./employer.routes /employer.routes";
import etatFinancierRoutes from "./etatFinancier.routes/etatFinancier.routes";
import facturesRoutes from "./facture.routes/facture.routes";
import infoKiloRoutes from "./infoKilo.routes/infoKilo.routes";
import infoPieceRoutes from "./infoPiece.routes/infoPiece.routes";
import lingesRoutes from "./linge.routes/linge.routes";
import typeLingeRoutes from "./typeLinge.routes/typeLinge.routes";
export default (app: any) => {
  //HOME
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: ".ECM...BIENVENU...SSL.",
      secure: req.secure,
      protocole: req.protocol,
    });
  });
  //RESSOURCES
  app.use("/sign", singInRoute);
  app.use("/admins", authAuthorization, roleAdminAuthorization, adminsRoutes);
  app.use("/clients", authAuthorization, clientsRoutes);
  app.use(
    "/compteBloquers",
    authAuthorization,
    roleAdminAuthorization,
    compteBloquersRoutes
  );
  app.use("/demandeDepenses", authAuthorization, demandeDepensesRoutes);
  app.use(
    "/depenses",
    authAuthorization,
    roleAdminAuthorization,
    depensesRoutes
  );
  app.use("/detailPieces", authAuthorization, detailPiecesRoutes);
  app.use("/detailTypeKilo", authAuthorization, detailTypeKiloRoutes);
  app.use("/detailTypePieces", authAuthorization, detailTypePiecesRoutes);
  app.use("/employers", authAuthorization, employersRoutes);
  app.use(
    "/etatFinancier",
    authAuthorization,
    roleAdminAuthorization,
    etatFinancierRoutes
  );
  app.use(
    "/factures",
    authAuthorization,
    roleAdminAuthorization,
    facturesRoutes
  );
  app.use("/infoKilo", authAuthorization, infoKiloRoutes);
  app.use("/infoPiece", authAuthorization, infoPieceRoutes);
  app.use("/linges", authAuthorization, lingesRoutes);
  app.use("/typeLinge", authAuthorization, typeLingeRoutes);

  //NOT FOUND
  app.use("*/**", (req: Request, res: Response) => {
    res.status(404).json({ message: "Cette ressource n'éxiste pas !" });
  });
};
