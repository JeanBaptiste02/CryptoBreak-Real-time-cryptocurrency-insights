const express = require("express");
const router = express.Router();

const UserCtrl = require("../controlleur/userControlleur");

const {
  authenticate,
  authorizeAdmin,
} = require("../authMiddleware/authMiddleware");

router.post("/login", UserCtrl.login);

router.post("/register", UserCtrl.signin);

router.post("/logout", authenticate, UserCtrl.logout);

router.get("/profile", authenticate, UserCtrl.getProfile);

router.put("/updateProfile", authenticate, UserCtrl.updateProfile);
router.put("/updateProfilectypto", authenticate, UserCtrl.updateProfilecrypto);
router.put("/deleteProfilectypto", authenticate, UserCtrl.deleteProfilecrypto);

router.put(
  "/updateRole",
  authenticate,
  authorizeAdmin,
  UserCtrl.updateUserRole
);

module.exports = router;
