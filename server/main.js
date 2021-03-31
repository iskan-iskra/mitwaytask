const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');

const port = 3000;

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(cors());

app.get('/users', async (req, res) => {
    const users = await prisma.dataBase.findMany();
    res.status(200).send(users);
});

app.delete('/users/:id', async (req, res) => {
    const id = Number(req.params.id)
    const user = await prisma.users.delete({
        where: {
            id: id
        }
    });
    res.status(200).send(user);
});

app.put('/users', async (req, res) => {
    const id = req.body.id;
    const user = await prisma.users.update({
        where: {
            id: id
        },
        data: {
            Name: req.body.Name,
            Role: req.body.Role
        }
    });
    res.status(200).send(user); // надо доделать
});

app.put('/users', async (req, res) => {
    const id = req.body.id;
    const user = await prisma.users.update({
        where: {
            id: id
        },
        data: {
            Status: req.body.Status
        }
    });
    res.status(200).send(user); // надо доделать
});






app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`)
})