import { fastify } from "fastify"
import { DatabaseMemory } from './database-memory.js'

const server = fastify()

const database = new DatabaseMemory()

server.post('/videos', (request, reply) => {
  const { title, description, duration } = request.body

  database.create({
    title: title,
    duration: duration,
    description: description,
  })

  return reply.status(201).send()
})

server.get('/videos', (request, reply) => {
  const videos = database.list()
  console.log(videos);
  return videos
})

server.put('/videos/:id', (request, reply) => {
  const videoId = request.params.id
  const  { title, description, duration } = request.body


  database.update(videoId, {
    title,
    duration,
    description,
  })

  return reply.status(204).send()

})

server.delete('/videos/:id', () => {
  return `Teste`
})

server.listen({
  port: 3333,
})