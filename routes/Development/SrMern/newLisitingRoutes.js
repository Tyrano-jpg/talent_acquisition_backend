import { Router } from "express";
// import AuthMiddleware from "../../../middlewares/verifyToken";
// import RolesPermissions from "../../../middlewares/permission";
// import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller";
import AuthMiddleware from "../../../middlewares/verifyToken.js";
import RolesPermissions from "../../../middlewares/permission.js";
import { listing_new_srmern } from "../../../controllers/development/srMern/new.controller.js";

const srMernRouter = Router();
console.log("oiwer9wer")

srMernRouter.post("/list", 
    AuthMiddleware,
    // RolesPermissions('user', 'add'),
    listing_new_srmern
);

export default srMernRouter;