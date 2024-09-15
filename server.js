import express from 'express';
const app= express();
//thêm middleware để đọc data json
app.use(express.json());
app.listen(8080,() => {
  console.log("Server online at port 8080");
}
);

app.get(`/`,(req,res) => {
  res.send("hello thai");
}
);

app.get(`/test`,(req,res) => {
   res.send("hellooooooo");
 }
);
//demo get pramams từ URL
app.post(`/user/:id/:hoTen`, (req,res) => {
   let prams= req.params;
   let{id,hoTen}=prams;
   let body =req.body;
   res.send({
      id,
      hoTen
   });
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

//test 
