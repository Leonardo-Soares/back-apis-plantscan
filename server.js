import { fastify } from "fastify"
import { DatabasePostgres } from "./database-postgres.js"

const server = fastify()

const database = new DatabasePostgres()

server.post('/usuario', async (request, reply) => {
  const { name, email, senha, numero_matricula, telefone } = request.body
  await database.create({
    name: name,
    email: email,
    senha: senha,
    telefone: telefone,
    numero_matricula: numero_matricula,
  })
  console.log(request.body)

  return reply.status(201).send()
})

server.get('/usuario', async (request) => {
  // const search = request.query.search

  // const videos = await database.list(search)
  const usuarios = await database.list()
  return usuarios
})

server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id
  const { title, description, duration } = request.body


  await database.update(videoId, {
    title,
    duration,
    description,
  })

  return reply.status(204).send()

})

server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id

  await database.delete(videoId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})