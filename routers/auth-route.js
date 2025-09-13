const express = require('express');
const router  = express.Router();
const { registerController, Logincontroller } = require("../controller/auth-controller");

//post request for register
router.post("/register",registerController);

//post request for Login
router.post("/login",Logincontroller);

module.exports = router;
