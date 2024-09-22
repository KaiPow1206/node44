import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';

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
         pass_word:pass,
      });
      return res.status(200).json({
         message: "Success Register",
         data:newAccount,
      });
  } catch (error) {
   return res.status(500).json({message:"error"});
}
}

export {
   register,
}