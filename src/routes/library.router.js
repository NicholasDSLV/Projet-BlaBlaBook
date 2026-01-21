import { Router } from "express";
import libraryController from "../controllers/library.controller.js";

const router = Router ();
router.get("/library", libraryController.getAll);


export default router;


