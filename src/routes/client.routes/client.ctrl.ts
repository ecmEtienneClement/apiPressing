import { Request, Response } from "express";
import ConnexionBd from "../../connexionBd/connexionBd";
import routesErrors from "../routes.errors";
import routesHelpers from "../routes.helper";

//
const getClientModel = () => {
  return ConnexionBd.getSequelizeDb().models.Client;
};
const messageClientNotFound = "Cet client n'éxiste pas.";

//TODO CREATE CLIENT
const createClient = async (req: Request, res: Response) => {
  try {
    const dataClient = await getClientModel().create({ ...req.body });
    return res.status(201).json(dataClient);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET ALL CLIENTS
const getAllClients = async (req: Request, res: Response) => {
  try {
    const dataClients = await getClientModel().findAll();
    return res.json(dataClients);
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO GET CLIENT BY ID
const getClientById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataClient = await getClientModel().findByPk(id);
    return dataClient
      ? res.json(dataClient)
      : res.json({ message: messageClientNotFound });
  } catch (error) {
    routesErrors.traitementErrorsReq(error, res);
  }
};

//TODO UPDATE CLIENT BY ID
const updateClientById = async (req: Request, res: Response) => {
  const id = routesHelpers.getParamId(req);
  try {
    const dataClient = await getClientModel().findByPk(id);
    if (!dataClient) {
      return res.json({ message: messageClientNotFound });
    }
    //
    const employerOwnerClient: string = dataClient.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerClient);
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
  const id = routesHelpers.getParamId(req);
  try {
    const dataClient = await getClientModel().findByPk(id);
    if (!dataClient) {
      return res.json({ message: messageClientNotFound });
    }
    //vrf OWNER
    const employerOwnerClient: string = dataClient.getDataValue("EmployeId");
    routesHelpers.vrfUserOwner(req, employerOwnerClient);
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
    await getClientModel().drop();
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
