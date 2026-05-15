import { Router } from "express";
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  delUser
} from "../controllers/users.controllers.js";

import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUser);
router.post("/users", postUser);
router.put("/users/:id", verifyToken, putUser);
router.delete("/users/:id", verifyToken, delUser);

export default router;