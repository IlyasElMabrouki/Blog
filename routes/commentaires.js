var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = require('../auth');

router.get('/', auth, async (req,res)=>{
    try{
        const comments = await prisma.Commentaire.findMany({
            take: parseInt(req.query.take),
            skip: parseInt(req.query.skip)
        });
        res.send(comments);
    }
    catch(error){
        res.status(500).send('ERROR');
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const comment = await prisma.Commentaire.findUnique({
            where: {
              id: parseInt(req.params.id)
            },
        });
        res.send(comment);
    }
    catch (error){
        res.status(500).send('ID du article introuvable!!' + req.params.id);
    }
});

router.post('/', auth, async (req,res)=>{
    const {contenu,email, articleId } = req.body;
    try {
        await prisma.Commentaire.create({
            data: {
                contenu,
                utilisateur: {
                    connect: {
                        email: email,
                    },
                },
                Article: {
                    connect: {
                        id: articleId,
                    },
                }
            },
            include: {
                utilisateur: true,
                Article: true
            },
        });
        res.send('Creation Success !!!')
    }
    catch(error){
        res.status(500).send('Try Again');
    }
})

router.patch('/', auth, async (req,res)=>{
    const {id, contenu,email, articleId } = req.body;
    try {
        await prisma.Commentaire.update({
            where: {
                id: parseInt(id),
            },
            data: {
                contenu,
                utilisateur: {
                    connect: {
                        email: email,
                    },
                },
                Article: {
                    connect: {
                        id: articleId,
                    },
                }
            },
            include: {
                utilisateur: true,
                Article: true
            },
        });
        res.send('Modification Success !!!')
    }
    catch(error){
        res.status(500).send('Try Again');
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        await prisma.Commentaire.delete({
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