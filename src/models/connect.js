import { Sequelize } from "sequelize";
const sequelize = new Sequelize(
   'youtube_mini', //tên database
   'root', // tên user
   '123456',// mật khẩu
   {
      host:'localhost',
      port: 3307,
      dialect: 'mysql'
   }
);
export default sequelize;

