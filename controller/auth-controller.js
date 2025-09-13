const usermodel = require("../models/user-model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req,res) => {
   try {
    const {username,email,password,address,phone,usertype} = req.body;
    
    //validation
    if(!username || !email || !password || !address || !phone){
       return res.status(400).send({
           success : false,
           message : 'please provide all fields'
        });
    }


    //check user
    const existing = await usermodel.findOne({email});
    if(existing){
        return res.status(400).send({
            success : false,
            message : "Email already exists please login"
        });
    }

   //Hashing password
 const hashedpassword = await bcrypt.hash(password,10);

 //create new user
   const user = await usermodel.create({
    username,
    email,
    password : hashedpassword,
    address,
    phone,
    usertype
   });
res.status(201).send({
    success : true,
    message : "Successfully Registered",
    user,
});

   } catch(error) {
     console.log("registeration Error : " + error);
     res.status(500).send({
        status : false,
        message : "Error in registration is API"
     });
   }
};




const Logincontroller = async (req,res) =>{
 try {
   const {email,password} =  req.body;
   //validation
   if(!email || !password){
      return res.status(500).send({
         success : false,
         message : "please provide E-mail and password"
      });
   }


    //check user only using E-mail
 const user = await usermodel.findOne({email : email});

 if(!user){
   return res.status(400).send({
      success : false,
      message : "user not found"
   });
 }

 //compare password using bcrypt

  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return res.status(400).send({
      success : false,
      message : "Incorrect password"
   });
  }


  //Jwt token implementaion
  const token = jwt.sign(
   {id : user._id,email : user.email},
   process.env.JWT_SECRET || "myjwtkey",
   {expiresIn : "1d"}
);

//hide encypt password in the postman
user.password = undefined;

   res.status(200).send({
      success : true,
      message : "Login successfully",
      token,
      user
   });

 
 } catch (error) {
   console.log("login Api error : " + error);
    res.status(500).send({
      success : false,
      message : "Error in login application"
   })
 }
}


module.exports = { registerController,Logincontroller};