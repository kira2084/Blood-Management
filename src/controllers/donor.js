const express=require("express");
const app=express();
const pool=require("../databases/connection")
const {Found,NotFound}=require("../middleware/index");
const donor=app.post('/donor',(req,res)=>{
   const { donor_name,
      gender,
      date_of_birth,
      mobile_number,
      address,
      weight,
      blood_pressure,
      iron_content,
      doctor_name,
      blood_bank_name,
      blood_type
   }=req.body;
      
   var doc_id=`SELECT d_id FROM doctor where d_name='${doctor_name}'`;
   pool.query(doc_id, (error, results, fields) => {
      if (error) throw error;
      
      // Assuming there is only one result for the given doctorName
      const doctorId = results[0].d_id;
      var sql=`INSERT INTO donor(d_name,phone,dob,gender,address,weight,blood_pressure,iron_cont,d_id) VALUES ("${donor_name}","${mobile_number}","${date_of_birth}","${gender}","${address}","${weight}","${blood_pressure}","${ iron_content}","${doctorId}")`
      
      pool.query(sql,(err,results,fields)=>{
         if(err){
            return console.log(err); 
         }
         //now inserting to blood table
         var donor_id=`SELECT donor_id FROM donor WHERE d_name='${donor_name}' `;
         pool.query(donor_id,(err,results,fields)=>{
            if(err){
               return console.log(err);   
            }
            const donorId = results[0].donor_id;//contain actual ID
            var bank_id=`SELECT bank_id FROM blood_bank WHERE bank_name='${blood_bank_name}'`;
            pool.query(bank_id,(err,results,fields)=>{
               if(err){
                  return console.log(err);
               }
               const bankId = results[0].bank_id;//contain actual ID
               var blood=`INSERT INTO blood VALUES("${blood_type}","${donorId}","${bankId}")`
               pool.query(blood,(err,results,fields)=>{
                  if(err){
                  return console.log(err);
                  }
                  return console.log(results);
               })
            })
         })
      })
   })
   return res.status(200).redirect('./succesfull.html');
})


module.exports=donor;

/*var sql=`insert into register values(5,"gsgs","sash@gmail.com","hfgdyd7",547947547)`
//first searching doctor id in table of doctor and then inserting in donor table because of doctor id used as forgein key





*/