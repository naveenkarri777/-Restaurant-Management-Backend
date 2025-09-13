const express = require('express');
const router = express.Router();
const { 
  getusercontroller,
  updateusercontroller,
  updatepasscontroller,
  resetpasscontroller,
  deleteusercontroller
 }  = require("../controller/user-controller");

const authmiddleware = require('../middleware/auth-middleware');


//get user route
router.get("/getuser",authmiddleware,getusercontroller);
// update user route
router.put("/updateuser",authmiddleware,updateusercontroller);
//update password route
router.post("/updatepassword",authmiddleware,updatepasscontroller);
//reset password route
router.post("/resetpassword",authmiddleware,resetpasscontroller);
//delete user route
router.delete("/deleteuser/:id",authmiddleware,deleteusercontroller);


module.exports = router;