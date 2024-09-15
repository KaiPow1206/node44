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
const app= express();
//thêm middleware để đọc data json
app.use(express.json());

app.get(`/`,(req,res) => {
  res.send("hello thai");
}
);

app.get(`/test`,(req,res) => {
   res.send("hellooooooo");
 }
);
//demo get pramams từ URL
// app.post(`/user/:id/:hoTen`, (req,res) => {
//    let prams= req.params;
//    let{id,hoTen}=prams;
//    let body =req.body;
//    res.send({
//       id,
//       hoTen
//    });
// }
// );
//import rootRoutes
app.use(rootRoutes);

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

// app.get('/users',async(req,res) => {
//   try {
//     const [data]= await pool.query(`SELECT * FROM users`);
//     res.status(OK).json(data);
//   } catch (error) {
//     res.status(INTERNAL_SERVER).json({message:'error'});
//   }
// }
// );

app.listen(8080,() => {
  console.log("Server online at port 8080");
}
);

//test 
