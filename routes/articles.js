var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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