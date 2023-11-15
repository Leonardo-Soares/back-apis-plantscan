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

server.get('/usuario/:id', async (request) => {
  const usuarioId = request.params.id

  const usuarios = await database.detalhe(usuarioId)
  return usuarios
})


server.put('/usuario/:id', async (request, reply) => {
  const usuarioId = request.params.id
  const { name, email, senha, telefone, numero_matricula } = request.body


  await database.update(usuarioId, {
    name, 
    email, 
    senha, 
    telefone, 
    numero_matricula
  })

  return reply.status(204).send()

})

server.delete('/usuarios/:id', async (request, reply) => {
  const usuarioId = request.params.id

  await database.delete(usuarioId)

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})