import { Router } from "express";
import libraryController from "../controllers/library.controller.js";
import {loginMiddleware} from "../middlewares/auth.middleware.js";


const router = Router ();
router.get("/library", loginMiddleware, libraryController.getAll);
router.post("/library/add", loginMiddleware, libraryController.create);
router.post("/library/status", loginMiddleware,libraryController.updateStatus)
router.post("/library/remove", loginMiddleware, libraryController.remove);


export default router;


