const express=require("express");
const router=express.Router();
const {donor,patient}=require("../controllers/index")
router.post("/donor",donor);

router.post("/patient",patient);

module.exports=router;