import pool from '../../db.js'
import { OK,INTERNAL_SERVER } from '../../const.js';
import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { Op } from 'sequelize';

const model = initModels(sequelize);



const creatUser= async(req,res) => {
   // let prams= req.params;
   // let{id,hoTen}=prams;
   // let body =req.body;
   // res.send({
   //    id,
   //    hoTen
   // });
   //lấy data từ body của req
   try {
      const {full_name,email,pass_word}=req.body;
      let newuser= await model.users.create({
         full_name,
         email,
         pass_word
      })
      return res.status(201).json(newuser);
   } catch (error) {
      return res.status(INTERNAL_SERVER).json({message:"error"});
   }
}

const getUser = async(req,res) => {
   try {
   //   const [data]= await pool.query(`SELECT * FROM users`);
   //   res.status(OK).json(data);
      let full_name =req.query.full_name||'';
      let data= await model.users.findAll({
         where:{
            full_name:{
               [Op.like]: `%${full_name}%` ,
               
            },
         },
         attributes:['user_id','full_name'],
         include:[
            {
               model:model.video,//chọn model muốn kết bảng
               as: 'videos',
               attributes: ['video_name','user_id'],//chỉ định model muốn hiển thị
               required:true,// default sẽ kết bảng theo left join muốn inner join thì required
               include:[{
                  model:model.video_comment,
                  as: 'video_comments'
               }],
            }
         ]
      });
      return res.status(OK).json(data);
   } catch (error) {
     return res.status(INTERNAL_SERVER).json({message:'error'});
   }
}   

const deleteUser = async(req,res) => {
   try {
      let {user_id} = req.params;
   //   const [data]= await pool.query(`
   //    Delete FROM users
   //    Where users.users_id = ${users_id}
   //    `);
      let user = await model.users.findByPk(user_id);
      if(!user){
         return res.status(404).json({message:"User not found"})
      }
      user.destroy();
      res.status(OK).json({message:"User deleted successfully!"});
   } catch (error) {
     return res.status(INTERNAL_SERVER).json({message:'error'});
   }
}
const updateUser = async(req,res) => {
   try {
      // cách 1 
      const {user_id} = req.params;
      const {full_name, pass_word}= req.body;
      //check user có hay không
      let user = await model.users.findByPk(user_id);
      // if(!user){
      //    return res.status(404).json({message:"User not found"});
      // }

      // let data = await model.users.update({
      //    full_name,pass_word},
      //    {
      //       where:{user_id}
      //    }
      // )
      user.full_name = full_name || user.full_name;
      user.pass_word = pass_word || user.pass_word;
      await user.save();
      return res.status(OK).json({message:"Update successfully!"})
   } catch (error) {
      console.log(error)
     return res.status(INTERNAL_SERVER).json({message:'error'});
   }
}


export{
   creatUser,
   getUser,
   deleteUser,
   updateUser,
}
