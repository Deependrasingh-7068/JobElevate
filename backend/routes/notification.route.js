import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getNotifications, markAsRead, deleteNotification } from "../controllers/notification.controller.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getNotifications);
router.route("/:id/read").put(isAuthenticated, markAsRead);
router.route("/:id").delete(isAuthenticated, deleteNotification);

export default router; 