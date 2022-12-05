import { Router } from "express";
import _inCtrl from "./_in.ctrl";

const singInRoute: Router = Router();

singInRoute.post("/", _inCtrl);

//
export default singInRoute;
