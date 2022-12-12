"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO
const traitementErrorsReq = (error, res) => {
    if (error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({
            message: error.errors[0].message,
            error,
        });
    }
    //TODO
    else if (error.name === "NotFoundPwd" ||
        error.name === "InvalidePwd" ||
        error.name === "NotFoundEmail" ||
        error.name === "InvalidEmail" ||
        error.name === "Forbidden") {
        res.status(400).json({
            message: error.message,
        });
    }
    //TODO
    else {
        res.status(500).json({
            message: "Une erreur c'est produite veillez réessayer dans quelques instants..." +
                error.message,
            error,
        });
    }
};
//DATA ROUTE ERROR EXPORT
const routesErrors = {
    traitementErrorsReq,
};
exports.default = routesErrors;
