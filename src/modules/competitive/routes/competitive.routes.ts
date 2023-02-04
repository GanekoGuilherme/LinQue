import { Router } from "express";
import CompetitiveController from "../controllers/CompetitiveController";

const competitiveController = new CompetitiveController();

const competitiveRoutes = Router();

competitiveRoutes.get("/classifications/:name", competitiveController.list);
competitiveRoutes.get("/player/:name", competitiveController.showPlayer);
competitiveRoutes.get(
  "/resume/:tournament/team/:team",
  competitiveController.resume
);

export default competitiveRoutes;
