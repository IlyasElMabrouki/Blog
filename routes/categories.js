var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/',async (req,res)=>{
    try{
        const categorie = await prisma.Categorie.findMany({
            take: parseInt(req.query.take),
            skip: parseInt(req.query.skip)
        });
        res.send(categorie);
    }
    catch(error){
        res.status(500).send('ERROR');
    }
})

router.get('/:id', async (req, res) => {
    try {
        const categorie = await prisma.Categorie.findMany({
            where: {
              id: parseInt(req.params.id)
            },
        });
        res.send(categorie);
    }
    catch (error){
        res.status(500).send('ID du categorie introuvable!!' + req.params.id);
    }
});

router.post('/', async (req,res)=>{
    try {
        await prisma.Categorie.create({
            data: {
                nom: req.body.nom
            },
        });
        res.send('Creation Success !!!')
    }
    catch(error){
        res.status(500).send('Try Again');
    }
})

router.patch('/',async (req,res)=>{
    try {
        await prisma.Categorie.update({
            where: {
                id: parseInt(req.body.id),
              },
              data: {
                nom: req.body.nom,
              },
        });
        res.send('Modification Success !!!')
    }
    catch(error){
        res.status(500).send('Try Again');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        await prisma.Categorie.delete({
            where: {
              id: parseInt(req.params.id)
            },
        });
        res.send('Delete is done !!');
    }
    catch (error){
        res.status(500).send('Try Again');
    }
});

module.exports = router;