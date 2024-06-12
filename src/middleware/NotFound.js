

const NotFound=(req,res)=>{
    res.status(400).redirect('./succesfull.html');
};
module.exports=NotFound;