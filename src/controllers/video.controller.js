import initModels from "../models/init-models.js";
import sequelize from '../models/connect.js';
import { Op, where } from 'sequelize';


const model = initModels(sequelize);

const getListVideo = async (req,res) => {
   try {
      let data = await model.video.findAll();
      res.status(200).json(data);
   } catch (error) {
      console.log(error)
      return res.status(404).json({message:"error"});
   }
}

const getTyppeVideo = async (req,res) => {
   try {
      let data = await model.video_type.findAll();
      res.status(200).json(data);
   } catch (error) {
      return res.status(404).json({message:"error"});
   }
}

const getTyppeDetails = async (req,res) => {
   try {
      let {typeID}= req.params;
      let data = await model.video.findAll({
         where: {
            type_id:typeID
         }
      })
      return res.status(200).json(data);
   } catch (error) {
      return res.status(500).json({message:"error"});
   }
}

const getVideoPage = async(req,res) => {
  try {
   let {page,size}=req.params;
   page =parseInt(page,10);
   size = parseInt(size,10);
   if(isNaN(page)|| page<0){
      return res.status(404).json({message:"Page is wrong"});
   }
   if(isNaN(size)|| size<0){
      return res.status(404).json({message:"Size is wrong"});
   }
   let index = (page - 1) * size;
   let data = await model.video.findAll({
      offset:index,
      limit:size,
   })
   res.status(200).json(data)
  } catch (error) {
   return res.status(404).json({message:"error"});
  }
}


export{
   getListVideo,
   getTyppeVideo,
   getTyppeDetails,
   getVideoPage,
}
