import { Router } from "express";
import libraryController from "../controllers/library.controller.js";
import {loginMiddleware} from "../middlewares/auth.middleware.js";


const router = Router ();
router.get("/library", loginMiddleware, libraryController.getAll);
router.post("/library", loginMiddleware, libraryController.create);
router.delete("/library", loginMiddleware, libraryController.remove);
export default router;


