/*
B1: npm init -> tạo file package.json
B2: tạo file js 
B3: install lib express (npm i express)
B4: update file json
  + thêm type module
  + thêm script start server "start:""node indexjs"
B5: khời tạo dự án:
  + import thư viện express (import express from 'express')
  + tạo object app (const app= express())
  + khởi tạo port cho BE
  + start server
 */


import express from 'express';
import pool from './db.js';
import { OK,INTERNAL_SERVER } from './const.js';
import rootRoutes from './src/routes/root.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app= express();
//thêm middleware cors để FE có thể call API tới BE
app.use(cors({
  origin:"http://localhost:3000",
  credentials: true // cho phép FE lấy cookie và lưu vào cookie browser
}));
//thêm middleware để đọc data json
app.use(express.json());
//thêm middleware để đọc cookie từ request
app.use(cookieParser());

//import rootRoutes
app.use(rootRoutes);
// hello
app.get(`/test`,(req,res) => {
  res.send("hellooooooo");
}
);
//demo get query từ URL
app.get(`/test-query`, (req,res) => {
      let query =req.query;
      res.send(query);
}
);
// demo get header from req
app.get(`/test-header`, (req,res) => {
  let headers =req.headers;
  res.send(headers);
}
);

app.listen(8080,() => {
  console.log("Server online at port 8080");
}
);

