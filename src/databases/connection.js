var { createPool } =require("mysql");
require("dotenv").config();
const pool=
    createPool({
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database:process.env.DATABASE,
        connectionLimit:process.env.CONNECTIONLIMIT,
        insecureAuth:true, // Add this line to use the old authentication method
    })


module.exports=pool;