const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post('/',async (req,res)=>{
    try {
        const {email,password} = req.body;
        const {id} = await prisma.Utilisateur.findUnique({
            where : {
                email: email,
            },
            select: {
                id: true
            }
        });
        const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(200).json({msg:'user created',token})
    }
    catch(error){
        res.status(500).json({msg:'Something was wrong'})
    }
})

module.exports = router;
