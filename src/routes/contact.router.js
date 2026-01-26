import { Router } from "express";

const router = Router();

router.get("/contact", (req, res) => {
  res.render("pages/contact"); // ou res.send("Contact")
});

export default router;
