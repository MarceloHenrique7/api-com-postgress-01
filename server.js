// import { createServer } from 'node:http';

// const server = createServer((request, response) => {

//     response.write('hello world')

//     return response.end()

// })

// server.listen(3333);


import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js'

const database = new DatabasePostgres();

const server = fastify();



// POST http://localhost:3333/videos

server.post('/videos', async (req, res) => {

    const {title, description, duration} = req.body;

    
    await database.create({
        title,
        description,
        duration
    })


    return res.status(201).send()
    
})

server.get('/videos', async (req, res) => {
    const search = req.query.search

    const videos = await database.list(search)
    return videos
})

server.put('/videos/:id', async (req, res) => {

    const videoId = req.params.id;

    const {title, description, duration} = req.body;

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return res.status(204).send()
})


server.delete('/videos/:id', async (req, res) => {
    const videoId = req.params.id;

    await database.delete(videoId)

    return res.status(204).send();
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})