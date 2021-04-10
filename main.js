const express = require('express');
const app = express();
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));

const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 3000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/users', async (req, res) => {
  const users = await prisma.users.findMany()
  res.status(200).send(users)
});

app.post('/users/create', async (req,res) => {
    const user = await prisma.users.create({
        data: {
          name: req.body.name,
          role: req.body.role,
          active: req.body.active
        },
    });
    res.status(201).send(user);
});

app.delete('/users/:id/deleted', async (req, res) => {
    const id = Number(req.params.id);
    const deleteUser = await prisma.users.delete({
        where: {
          id:id
        },
      });
    res.status(200).send(deleteUser);
});

app.post('/users/:id/update', async (req, res) =>{
    const id = Number(req.params.id);
    const updateUser = await prisma.users.update({
        where: {
          id:id,
        },
        data: {
          name: req.body.name,
          role: req.body.role,
        },
      });
    res.status(200).send(updateUser);
});

app.post('/users/:id/disactive', async (req, res) =>{
    const id = Number(req.params.id);
    const updateUser = await prisma.users.update({
        where: {
          id:id,
        },
        data: {
          active:"disactive",
        },
      });
    res.status(200).send(updateUser);
});


app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}\n`)
})