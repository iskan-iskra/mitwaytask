# mitwaytask
rep for tasks from mitway


[Проект на HEROKU](https://mitwaytask.herokuapp.com/)

## Описание:
Вывод в таблицу базы данных пользователей с параметрами:
- ID
- NAME
- ROLE
- ACTIVE


Выподающее меню с кнопками:
- Редактировать
- Удалить
- Деактивировать


Поиск по фильтрации:


при вводе нескольких символов в строку поиска отображаются только те строки,\
которые соответствуют критериям поиска


![Демонстрация проекта](https://i.ibb.co/QFySTJ2/2021-04-08-20-01-48.png)


## В проекте испольщовались:
- язык разметки HTML
- язык каскадных таблицей стилей css
- java script
- vue js
- express json
- prisma
- cors
- axios для vue js


## Серверная часть проекта:
### Подключение express js
``` js
const express = require('express');
const app = express();
app.use(express.json());
app.use('/', express.static(__dirname + '/public'));
```
### Подключение политики CORS:
```js
const cors = require('cors');
app.use(cors());
```
### Настройка порта:
```js
const port = process.env.PORT || 3000;
```
### Подключение prisma
```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```
### Прослушивание порта:
```js
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}\n`)
})
```
### get запрос на получение данных:

```js
app.get('/users', async (req, res) => {
  const users = await prisma.users.findMany()
  res.status(200).send(users)
});
```

### post запрос для генерации новой записи в БД:
```js
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

```

### delete запрос для удаления записи:
```js
app.delete('/users/:id/deleted', async (req, res) => {
    const id = Number(req.params.id);
    const deleteUser = await prisma.users.delete({
        where: {
          id:id
        },
      });
    res.status(200).send(deleteUser);
});
```

### post запрос для изменения имени и роли записи:
```js
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
```
### post запрос для деактивации записи:
```js
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
```
