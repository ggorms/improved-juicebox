const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await prisma.User.findMany();
        res.send(allUsers)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await prisma.User.findUnique({
            where: {
                id: +req.params.id
            }
        })
        res.send(user)
    } catch (error) {
        next(error)
    }
})


module.exports = router;