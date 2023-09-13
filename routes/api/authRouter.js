const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/authController");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.registerUser
);

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.loginUser);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.post("/logout", authenticate, ctrl.logoutUser);

router.patch("/users", authenticate, ctrl.updateSubscription);

module.exports = router;
