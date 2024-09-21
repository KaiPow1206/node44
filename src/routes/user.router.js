import express from 'express';
import { creatUser, deleteUser, getUser,updateUser } from '../controllers/user.controller.js';
const userRoutes = express.Router();

userRoutes.post(`/create-users`,creatUser);
userRoutes.get(`/get-users`,getUser);
userRoutes.delete(`/delete-users/:user_id`,deleteUser);
userRoutes.put(`/update-users/:user_id`,updateUser);
export default userRoutes;