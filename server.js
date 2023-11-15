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

server.get('/usuarios', async (request, reply) => {
  try {
    const usuarios = await database.list()

    if (usuarios.length === 0) {
      return reply.status(204).send()
    }

    const resposta = {
      success: true,
      results: {
        usuarios: usuarios
      }
    };

    return reply.status(200).send(resposta)
  } catch (error) {
    console.error('Erro ao obter a lista de usuários:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }

    return reply.status(500).send(respostaErro)
  }
})

server.get('/usuario/:id', async (request, reply) => {
  try {
    const usuarioId = request.params.id
    const usuarios = await database.detalhe(usuarioId)

    const resposta = {
      success: true,
      message: 'Usuário encontrado com sucesso',
      results: {
        usuario: usuarios
      }
    }

    return reply.status(200).send(resposta)
  } catch (error) {
    console.error('Erro ao obter a lista de usuários:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }
})

server.put('/usuario/:id', async (request, reply) => {
  try {
    const usuarioId = request.params.id
    const { name, email, senha, telefone, numero_matricula } = request.body

    const response = await database.update(usuarioId, {
      name,
      email,
      senha,
      telefone,
      numero_matricula
    })

    const resposta = {
      success: true,
      message: 'Usuário atualizado com sucesso',
    }

    return reply.status(200).send(resposta)

  } catch (error) {
    console.error('Erro ao obter detalhes do usuário:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }
})

server.delete('/usuarios/:id', async (request, reply) => {
  try {
    const usuarioId = request.params.id
    const response = await database.delete(usuarioId)

    const resposta = {
      success: true,
      message: 'Usuário excluído com sucesso',
    }

    return reply.status(200).send(resposta)

  } catch (error) {
    console.error('Erro ao deletar o usuário:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }
})

// 
// ### CRUD Plantas
// 

server.post('/planta', async (request, reply) => {
  try {
    const { image, effects, curiosities, names_group, name_popular, characteristics, name_scientific } = request.body

    const response = await databasePlantas.create({
      image: image,
      effects: effects,
      curiosities: curiosities,
      names_group: names_group,
      name_popular: name_popular,
      characteristics: characteristics,
      name_scientific: name_scientific,
    })

    const resposta = {
      success: true,
      message: 'Planta cadastrada com sucesso',
    }

    return reply.status(200).send(resposta)

  } catch (error) {
    console.error('Erro ao cadastrar planta:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }
})

server.get('/plantas', async (request, reply) => {
  try {
    const plantas = await databasePlantas.list()

    const resposta = {
      success: true,
      message: 'Plantas encontradas com sucesso',
      results: plantas
    }

    return reply.status(200).send(resposta)
  } catch (error) {
    console.error('Erro ao obter a lista de usuários:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }
})

server.get('/planta/:id', async (request, reply) => {
  try {
    const plantaId = request.params.id
    const plantas = await databasePlantas.detalhe(plantaId)

    const resposta = {
      success: true,
      message: 'Planta encontrada com sucesso',
      results: plantas
    }

    return reply.status(200).send(resposta)
  } catch (error) {
    console.error('Erro ao obter planta:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }
})

server.put('/planta/:id', async (request, reply) => {
  try {
    const plantaId = request.params.id
    const { image, effects, curiosities, names_group, name_popular, characteristics, name_scientific } = request.body

    const response = await databasePlantas.update(plantaId, {
      image,
      effects,
      curiosities,
      names_group,
      name_popular,
      characteristics,
      name_scientific
    })

    const resposta = {
      success: true,
      message: 'Planta atualizada com sucesso',
    }

    return reply.status(200).send(resposta)

  } catch (error) {
    console.error('Erro ao atualizar planta:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }

})

server.delete('/planta/:id', async (request, reply) => {
  try {
    const planta = request.params.id

    const response = await databasePlantas.delete(planta)

    const resposta = {
      success: true,
      message: 'Planta excluída com sucesso',
    }

    return reply.status(200).send(resposta)

  } catch (error) {
    console.error('Erro ao deletar planta:', error)

    const respostaErro = {
      success: false,
      results: {
        message: 'Erro interno do servidor',
        error: error.message
      }
    }
    return reply.status(500).send(respostaErro)
  }
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