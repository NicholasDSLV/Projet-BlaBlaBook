import { Router } from "express";

const router = Router();

router.get("/legals", (req, res) => {
  res.render("pages/legals"); 
});

export default router;