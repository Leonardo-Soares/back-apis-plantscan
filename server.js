import { fastify } from 'fastify'
import { DatabasePostgres, DatabasePostgresPlantas, DatabasePostgresLogin } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()
const databasePlantas = new DatabasePostgresPlantas()
const databaseLogin = new DatabasePostgresLogin()

// 
// ### CRUD Usuários
// 

server.post('/usuario', async (request, reply) => {
  const { name, email, senha, numero_matricula, telefone } = request.body

  const response = await database.create({
    name: name,
    email: email,
    senha: senha,
    telefone: telefone,
    numero_matricula: numero_matricula,
  })

  if (response) {
    return reply.status(200).send(response)
  } else {
    return reply.send(response)
  }
})

server.get('/usuarios', async () => {
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

// 
// ### CRUD Plantas
// 

server.post('/planta', async (request, reply) => {
  const { image, effects, curiosities, names_group, name_popular, characteristics, name_scientific } = request.body

  await databasePlantas.create({
    image: image,
    effects: effects,
    curiosities: curiosities,
    names_group: names_group,
    name_popular: name_popular,
    characteristics: characteristics,
    name_scientific: name_scientific,
  })

  return reply.status(201).send()
})

server.get('/plantas', async () => {
  const plantas = await databasePlantas.list()
  return plantas
})

server.get('/planta/:id', async (request) => {
  const plantaId = request.params.id

  const plantas = await databasePlantas.detalhe(plantaId)
  return plantas
})

server.put('/planta/:id', async (request, reply) => {
  const plantaId = request.params.id
  const { image, effects, curiosities, names_group, name_popular, characteristics, name_scientific } = request.body

  await databasePlantas.update(plantaId, {
    image,
    effects,
    curiosities,
    names_group,
    name_popular,
    characteristics,
    name_scientific
  })

  return reply.status(204).send()

})

server.delete('/planta/:id', async (request, reply) => {
  const planta = request.params.id

  await databasePlantas.delete(planta)

  return reply.status(204).send()
})

// 
// ### Login usuário
// 

// Rota para autenticação
server.post('/login', async (request, reply) => {
  const { email, senha } = request.body;

  const response = await databaseLogin.login(email, senha, reply)

  if (response) {
    return reply.status(204).send(response)
  }

  return reply.status(204).send()
})

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})