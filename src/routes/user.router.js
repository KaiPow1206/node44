import express from 'express';
import { creatUser, deleteUser, getUser } from '../controllers/user.controller.js';
const userRoutes = express.Router();

userRoutes.post(`/:id/:hoTen`,creatUser);
userRoutes.get(`/get-users`,getUser);
userRoutes.delete(`/delete-users/:users_id`,deleteUser);
export default userRoutes;