import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import { NameModelsListe } from "../../models/namingModelListe";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getModels = () => {
  return ConnexionBd.modelsList.get(NameModelsListe.client);
};
const messageClientNotFound = "Cet client n'éxiste pas.";

//TODO CREATE CLIENT
const createClient = async (req: Request, res: Response) => {
  try {
    const dataClient = await getModels().create({
      ...req.body,
    });
    return res.status(201).json(dataClient);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL CLIENTS
const getAllClients = async (req: Request, res: Response) => {
  try {
    const dataClients = await getModels().findAll({
      include: { all: true },
    });
    return res.json(dataClients);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET CLIENT BY ID
const getClientById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);
    //
    const dataClient = await getModels().findByPk(id, {
      include: { all: true },
    });
    //
    return dataClient
      ? res.json(dataClient)
      : res.status(404).json({ message: messageClientNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE CLIENT BY ID
const updateClientById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataClient = await getModels().findByPk(id);
    if (!dataClient) {
      return res.status(404).json({ message: messageClientNotFound });
    }
    //
    const employerOwnerClient: string = dataClient.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerClient, true);
    //
    const clientUpdated = await dataClient.update(
      { ...req.body },
      { where: { id: id } }
    );
    return res.json(clientUpdated);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE CLIENT BY ID
const deleteClientById = async (req: Request, res: Response) => {
  try {
    const id = routesHelpers.getParamId(req);

    const dataClient = await getModels().findByPk(id);
    if (!dataClient) {
      return res.status(404).json({ message: messageClientNotFound });
    }
    //vrf OWNER
    const employerOwnerClient: string = dataClient.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerClient, true);
    //
    await dataClient.destroy();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO DELETE ALL CLIENTS
const deleteAllClients = async (req: Request, res: Response) => {
  try {
    await getModels().drop();
    return res.json({ deleted: true });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//DATA ROUTES EXPORTED
const clientsCtrl = {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClientById,
  deleteAllClients,
};

export default clientsCtrl;
