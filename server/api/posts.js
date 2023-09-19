const express = require('express');
const router = express.Router();
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
    try {
        const allPosts = await prisma.post.findMany();
        res.send(allPosts);
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: +req.params.id
            }
        })
        res.send(post)
    } catch (error) {
        next(error)
    }
})

router.get('/user/:id', async (req,res, next) => {
    try {
        const allPosts = await prisma.post.findMany({
            where: {
                userId: +req.params.id
            }
        })
        res.send(allPosts)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const post = await prisma.post.create({
            data: req.body
        })
        res.send(post)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const post = await prisma.post.update({
            where: {
                id: +req.params.id
            },
            data: req.body
        })
        res.send(post)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req,res,next) => {
    try {
        const post = await prisma.post.delete({
            where: {
                id: +req.params.id
            }
        })
        res.send(post)
    } catch (error) {
        next(error)
    }
})

module.exports = router;