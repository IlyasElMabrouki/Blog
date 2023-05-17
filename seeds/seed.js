const { PrismaClient } = require("@prisma/client");
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();

async function seed() {
  //Suppressions des données existants
  await prisma.ArticleCategorie.deleteMany();
  await prisma.Commentaire.deleteMany();
  await prisma.Article.deleteMany();
  await prisma.Categorie.deleteMany();
  await prisma.Utilisateur.deleteMany();

  //Creation 10 Utilisateur AUTHOR
  const authorUsers = [...Array(10)].map(() => ({
    nom: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: "AUTHOR",
  }));
  await prisma.Utilisateur.createMany({ data: authorUsers });

  //Creation Utilisateur ADMIN
  const admin = {
    nom: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: "ADMIN",
  };
  await prisma.Utilisateur.create({ data: admin });

  //RECUPERATION DES IDS DES UTILISATEURS
  const usersId = await prisma.Utilisateur.findMany({select : {id:true,}});

  //CREATION 10 categories
  const categories = [...Array(10)].map(() => ({
    nom: faker.commerce.department(),
  }));
  await prisma.Categorie.createMany({ data: categories });

  //RECUPERATION DES IDS DES CATEGORIES
  const categoriesId = await prisma.Categorie.findMany({select : {id:true,}});

  //CREATION DE 100 ARTICLES
  const articles = [...Array(100)].map(() => ({
    titre: faker.lorem.sentence(),
    contenu: faker.lorem.paragraphs(3),
    image: faker.image.url(),
    utilisateurId: usersId[Math.floor(Math.random() * usersId.length)].id,
  }));
  await prisma.Article.createMany({ data: articles });

  //RECUPERATION DES IDS DES ARTICLES
  const articlesId = await prisma.Article.findMany({select : {id:true,}});

  var articlecategories = [];

  articlesId.forEach((article) => {
    const numCategorie = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < numCategorie; i++) {
      const articlecategorie = {
        categorieId: categoriesId[Math.floor(Math.random() * categoriesId.length)].id,
        articleId: article.id,
      };
      articlecategories.push(articlecategorie);
    }
  });

  await prisma.ArticleCategorie.createMany({ data: articlecategories });

  var commentaires = [];

  articlesId.forEach((article) => {
    const numComments = Math.floor(Math.random() * 20);
    for (let i = 0; i < numComments; i++) {
      const commentaire = {
        contenu: faker.lorem.sentence(),
        email: authorUsers[Math.floor(Math.random() * authorUsers.length)].email,
        articleId: article.id,
      };
      commentaires.push(commentaire);
    }
  });

  await prisma.Commentaire.createMany({ data: commentaires });
}

seed()
  .then(async () => prisma.$disconnect)
  .catch(async (e) => {
    console.log(e);
    prisma.$disconnect;
    process.exit(1);
  });
