const express=require("express");
const app=express();
const pool=require("../databases/connection");
const {Found,NotFound}=require("../middleware/index");
const patient=app.post('/patient',(req,res)=>{
        const {donor_name,
            donor_mobile_number,
            patient_address,
            hospital_address,
            blood_bank_name,
            blood_type,
            }=req.body;
            console.log(donor_name,
                donor_mobile_number,
                patient_address,
                hospital_address,
                blood_bank_name,
                blood_type,
            );
        var bID=`SELECT * FROM blood_bank WHERE bank_name ='${ blood_bank_name}' AND bank_add='${hospital_address}'`;
        
        pool.query(bID,(err,results)=>{
        
            if (err) {
                
                res.status(200).redirect('./NotExact.html');
            }else {
                // Process the results
                if (results.length === 0) {
                    res.status(200).redirect('./NotExact.html');
                    // Handle the case where no matching record is found
                    //res.status(200).redirect('./NotExact.html');
                } else {
                    const bankId = results[0].bank_id;
                    //console.log('Found bank ID:', bankId);
                    // Continue with your logic using the retrieved bank ID
                    var type=`SELECT * FROM blood WHERE blood_type='${blood_type}'
                    AND bank_id='${bankId}'`;
                    
                    pool.query(type,(err,results)=>{
                        if(err){
                            res.status(200).redirect('./NotExact.html');
                            //res.status(200).redirect('./NotExact.html');
                        }else{
                            var patienttab=`INSERT INTO patient (p_name,p_ph,h_add,p_add) VALUES ("${donor_name}","${donor_mobile_number}","${hospital_address}","${ patient_address}")`
                            pool.query(patienttab,(err,results)=>{
                                if(err){
                                    res.status(200).redirect('./NotExact.html');
                                   // res.status(200).redirect('./NotExact.html');
                                }
                                var pid=`SELECT p_id FROM patient WHERE p_ph='${donor_mobile_number}'`;
                                pool.query(pid,(err,results)=>{
                                    if(err){
                                        res.status(200).redirect('./NotExact.html');
                                        //res.status(200).redirect('./NotExact.html');
                                    }
                                    var PID=results[0].p_id;
                                    var blood_del=`INSERT INTO blood_delivery VALUES("${bankId}","${PID}")`;
                                    console.log(bankId," ",PID);
                                    pool.query(blood_del,(err,results)=>{
                                        if(err){
                                            return console.log(err);
                                            //return res.status(200).redirect('./NotExact.html');
                                        }
                                       return  res.status(200).redirect('./succesfull.html');
                                
                                    })
                                }) 
                            })
                            
                            
                        }
                    })
                }
            } 
                
            
        })
        
    });


module.exports=patient;