var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = require('../auth');

router.get('/',auth, async (req,res)=>{
    try{
        const articles = await prisma.Article.findMany({
            take: parseInt(req.query.take),
            skip: parseInt(req.query.skip),
            include : {
                user: true,
                categories : true,
                //commentaires: true
            }
        });
        articles.forEach((article) => {
            article.updatedAt = article.updatedAt.toLocaleDateString();
        });
        res.send(articles);
    }
    catch(error){
        res.status(500).send('ERROR');
    }
})

router.get('/:id',auth, async (req, res) => {
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

router.post('/',auth, async (req,res)=>{
    const { titre, contenu, image, utilisateurId,categories} = req.body;

    const categoriesId = categories.map(category => category.id);
    var userRole;

    try {
        userRole = await prisma.utilisateur.findUnique({
            where: {
                id: parseInt(utilisateurId)
            },
            select : {
                role : true,
            }
        });

        if (userRole.role !== "AUTHOR") throw error;

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
                categories: {
                    connect: categoriesId.map(id => ({ id }))
                }
            },
            include: {
                user: true,
                categories: true
            },
        });
        res.send('Creation Success !!!')
    }
    catch(error){
        if (userRole.role !== "AUTHOR") {
            res.status(500).send('Only Author ...');
        }
        else {
            res.status(500).send('Try Again');
        }
    }
})

router.patch('/',auth, async (req,res)=>{
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

router.delete('/:id',auth, async (req, res) => {
    try {
        await prisma.Article.delete({
            where: {
              id: parseInt(req.params.id)
            },
        });
        res.json({msg:'Delete is Done!!'});
    }
    catch (error){
        res.status(500).send('ID du article introuvable!!' + req.params.id);
    }
});

module.exports = router;