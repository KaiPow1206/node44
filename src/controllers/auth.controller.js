import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from "../config/transporter.js";
import { createToken } from "../config/jwt.js";

const model = initModels(sequelize);

const register = async(req,res,next) => {
  try {
      const {fullName, email, pass}= req.body;
      console.log({fullName,email,pass});
      const userExits= await model.users.findOne({
         where:{
            email:email,
         }
      });
      if(userExits){
         return res.status(400).json({message:"Already account"})
      }
      //B3: thêm người mới vào
      const newAccount  = await model.users.create({
         full_name:fullName,
         email:email,
         pass_word:bcrypt.hashSync(pass,10),
      });
      // cấu hình info email
      const mailOption = {
         from:'nguyennhoanhthai@gmail.com',
         to: email,
         subject:"Welcome to our service",
         text:`Hello ${fullName}.Best Regards.`
      }
      // gửi mail
      transporter.sendMail(mailOption,(error,info) => {
         if(error){
            return res.status(500).json({message:"error"});
         }
         return res.status(200).json({
            message: "Success Register",
            data:userNew,
         });
      })
      return res.status(200).json({
         message: "Success Register",
         data:newAccount,
      });
  } catch (error) {
   return res.status(500).json({message:"error"});
}
};
const login= async (req,res) => {
  try {
   //B1: lấy email và password từ body req
   //B2: check user thông qua email(get user từ db)
   //B2.1: nếu không có user => ra error user not found
   //B2.2: nếu có user => check tiếp password
   //B2.2.1: nếu password không trùng nhau => password error
   //B2.2.2: nếu password trùng => tạo access token
   let{email,pass_word}=req.body;
   let user = await model.users.findOne({
      where:{
         email,
      }
   });
   if(!user){
      return res.status(400).json({message:"Email is wrong"});
   }
   let checkPass = bcrypt.compareSync(pass_word,user.pass_word);
   if (!checkPass){
      return res.status(400).json({message:"Passwword is wrong"});
   }
   // tạo token 
   //function style của jwt 
   //param1: nơi tạo payload và lưu vào token
   //param2: key tạo token 
   //param3: chứa thông tin settings live time của token và thuật toán để tạo token 
   let payload= {
      userID: user.user_id,
   }
   let accessToken = createToken({userId:user.user_id});
   return res.status(200).json({
      message:"login successfully",
      data: accessToken,
   });
  } catch (error) {
   return res.status(500).json({message:"error"});
  }
}

const loginFaceBook = async (req,res) => {
   try {
      //B1: Lấy id, email, name từ request
      //B2: check id(app_face_id trong db)
      //B2.1: nếu có app_face_idd => tạo access token => gửi về FE
      //B2.2: nếu không có app_face_id => tạo user mới => tạo access token => gửi về FE
      let {id,email,name}= req.body;
      let user = await model.users.findOne({
         where:{face_app_id: id}
      })
      if(!user){
         let newUser ={
            full_name: name,
            face_app_id: id,
            email,
         }
         user = await model.users.create(newUser);
      }
      let accessToken = createToken({userId:user.user_id})
      return res.status(200).json({
         message:"login successfully",
         data: accessToken,
      });
   } catch (error) {

      return res.status(500).json({message:"error"});
   }
}



export {
   register,
   login,
   loginFaceBook,
}