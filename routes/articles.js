var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/',async (req,res)=>{
    try{
        const articles = await prisma.Article.findMany({
            take: parseInt(req.query.take),
            skip: parseInt(req.query.skip)
        });
        res.send(articles);
    }
    catch(error){
        res.status(500).send('ERROR');
    }
})


router.get('/:id', async (req, res) => {
    try {
        const article = await prisma.Article.findMany({
            where: {
              id: parseInt(req.params.id)
            },
        });
        res.send(article);
    }
    catch (error){
        res.status(500).send('ID du article introuvable!!' + req.params.id);
    }
});

router.post('/', async (req,res)=>{
    const { titre, contenu, image, utilisateurId, categoryId} = req.body;
    try {
        await prisma.Article.create({
            data: {
                titre,
                contenu,
                image,
                user: {
                    connect: {
                        id: utilisateurId,
                    },
                },
            },
            include: {
                user: true,
            },
        });
        res.send('Creation Success !!!')
    }
    catch(error){
        res.status(500).send('Try Again');
    }
})

router.patch('/',async (req,res)=>{
    const {id,titre, contenu, image, utilisateurId} = req.body;
    try {
        await prisma.Article.update({
            where: {
                id: parseInt(id),
            },
            data: {
                titre,
                contenu,
                image,
                user: {
                    connect: {
                        id: utilisateurId,
                    },
                },
            },
            include: {
                user: true,
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
        await prisma.Article.delete({
            where: {
              id: parseInt(req.params.id)
            },
        });
        res.send('Delete is done !!');
    }
    catch (error){
        res.status(500).send('ID du article introuvable!!' + req.params.id);
    }
});

module.exports = router;