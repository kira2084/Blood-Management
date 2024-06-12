const express=require("express");
const bodyParser=require("body-parser");
const {StatusCodes}=require("http-status-codes");
const router=require("./src/router/route")
//const {sqldbs}=require("./databases/connection");
var {createPool}=require('mysql');
const app=express();
require("dotenv").config();
app.use(express.json());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const port=5000 || process.env.PORT;
//const pool=sqldbs;
// const pool=createPool({
//     host:process.env.HOST,
//     user:process.env.USER,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
//     connectionLimit:process.env.CONNECTIONLIMIT,
        
// })

app.use("/",router);





app.listen(port,()=>{
    console.log(`server started at ${port} `)
});

