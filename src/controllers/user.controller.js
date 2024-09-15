const creatUser= (req,res) => {
   let prams= req.params;
   let{id,hoTen}=prams;
   let body =req.body;
   res.send({
      id,
      hoTen
   });
}
import pool from '../../db.js'
import { OK,INTERNAL_SERVER } from '../../const.js';

const getUser = async(req,res) => {
   try {
     const [data]= await pool.query(`SELECT * FROM users`);
     res.status(OK).json(data);
   } catch (error) {
     res.status(INTERNAL_SERVER).json({message:'error'});
   }
}   

const deleteUser = async(req,res) => {
   try {
      let {users_id} = req.params;
     const [data]= await pool.query(`
      Delete FROM users
      Where users.users_id = ${users_id}
      `);
     res.status(OK).json(data);
   } catch (error) {
     res.status(INTERNAL_SERVER).json({message:'error'});
   }
}

export{
   creatUser,
   getUser,
   deleteUser,
}
