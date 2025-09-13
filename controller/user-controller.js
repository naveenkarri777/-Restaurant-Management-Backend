const usermodel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//get userinfo
const getusercontroller = async (req,res) => {
  try {
    const user = await usermodel.findById(req.user.id);
     res.status(200).send(user);
  } catch (error) {
    console.error(" user Api  error:", error);
     res.status(500).send({
      success: false,
      message: "Error in get user API",
    });
  }
}

//updata userinfo
const updateusercontroller = async (req, res) => {
  try {
    const { id, username, phone, address } = req.body;

    // find user by ID
    const user = await usermodel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // update fields if provided
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });

  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).send({
      success: false,
      message: "Error in update user API",
    });
  }
};

//update password
const updatepasscontroller = async (req,res)=> {
   try {
     const user = await usermodel.findById(req.user.id);
    
     if (!user){
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

  //get data means old and newpassword
    const { oldpassword,newpassword } = req.body;
    if(!oldpassword || !newpassword){
      return res.status(404).send({
        success: false,
        message: "Your old and new password doesn't match",
    });
    }
   //check old password correct or not
   const isMatch  = await bcrypt.compare(oldpassword,user.password);
   if(!isMatch){
       return res.status(404).send({
        success: false,
        message: "Your old password is Incorrect so,please enter again",
    });
    }

     //Hashing password
 const hashedpassword = await bcrypt.hash(newpassword,10);
  user.password = hashedpassword;
  await user.save();
  res.status(201).send({
    success : true,
    message : "Successfully update your password",
});
 
   } catch (error) {
     console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
   }
} 
  

//reset password
const resetpasscontroller = async (req, res) => {
  try {
    const { token, newpassword } = req.body;

    if (!token || !newpassword) {
      return res.status(400).send({
        success: false,
        message: "Token and new password are required",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultkey");

    const user = await usermodel.findById(decoded.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // hash new password and save
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Reset Password Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in reset password API",
      error: error.message,
    });
  }
}


//delete user
const deleteusercontroller= async (req,res) => {
      try {
        await usermodel.findByIdAndDelete(req.params.id);
        res.status(200).send({
          success : true,
          message : "your account successfully deleted"
        })
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success : false,
          message : "Error in delete user API"
        })
      }
}

module.exports = { 
  getusercontroller,
  updateusercontroller,
  updatepasscontroller,
  resetpasscontroller,
  deleteusercontroller
};