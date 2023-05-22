var express = require('express');
var router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = require('../auth');

router.get('/',auth, async (req,res)=>{
  try{
      const users = await prisma.Utilisateur.findMany({
          take: parseInt(req.query.take),
          skip: parseInt(req.query.skip)
      });
      res.send(users);
  }
  catch(error){
      res.status(500).send('ERROR');
  }
})

router.get('/:id',auth, async (req, res) => {
  try {
      const user = await prisma.Utilisateur.findMany({
        where : {
            id: parseInt(req.params.id)
        },
      });
      res.send(user);
  }
  catch (error){
      res.status(500).send('ID du utilisateur introuvable!!' + req.params.id);
  }
});

router.post('/', async (req,res)=>{
  try {
      await prisma.Utilisateur.create({
          data: {
              nom: req.body.nom,
              email: req.body.email,
              password : req.body.password,
              role: req.body.role
          },
      });
      res.send('Creation Success !!!');
  }
  catch(error){
      res.status(500).send('Try Again');
  }
})

router.patch('/',auth, async (req,res)=>{
  try {
      await prisma.Utilisateur.update({
          where: {
              id: parseInt(req.body.id),
            },
            data: {
              nom: req.body.nom,
              email: req.body.email,
              password : req.body.password,
              role: req.body.role
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
      await prisma.Utilisateur.delete({
          where: {
            id: parseInt(req.params.id)
          },
      });
      res.json({msg:'Delete is Done!!'});
  }
  catch (error){
      res.status(500).send('Try Again');
  }
});

module.exports = router;
