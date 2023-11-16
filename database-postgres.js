import { sql } from './db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class DatabasePostgres {
  async list() {
    let usuario
    usuario = await sql`SELECT id, name, email, numero_matricula, telefone FROM usuarios`;

    return usuario
  }

  async detalhe(usuarioId) {
    let usuario

    if (usuarioId) {
      usuario = await sql`SELECT * FROM usuarios WHERE id = ${usuarioId}`
      return usuario[0]
    } else {
      return []
    }
  }

  async create(usuario) {
    const { name, email, senha, telefone, numero_matricula } = usuario

    function validarEmail(email) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regexEmail.test(email);
    }

    if (!name) {
      return {
        sucess: false,
        results: {
          message: 'Campo nome é obrigatório',
        }
      }
    }

    if (!telefone) {
      return {
        sucess: false,
        results: {
          message: 'Campo telefone é obrigatório',
        }
      }
    }

    if (!numero_matricula) {
      return {
        sucess: false,
        results: {
          message: 'Campo número de matrícula é obrigatório',
        }
      }
    }

    if (!email) {
      return {
        sucess: false,
        results: {
          message: 'Campo e-mail é obrigatório',
        }
      }
    }

    if (!validarEmail(email)) {
      return {
        sucess: false,
        results: {
          message: 'Informe um e-mail válido',
        }
      }
    }

    // Verifica se o e-mail já está cadastrado
    const emailExistente = await sql`SELECT 1 FROM usuarios WHERE email = ${email} LIMIT 1`;

    if (emailExistente.length >= 1) {
      return {
        sucess: false,
        results: {
          message: 'Esse e-mail já possui um cadastrado',
        }
      }
    }

    if (!senha) {
      return {
        sucess: false,
        results: {
          message: 'Campo senha é obrigatório',
        }
      }
    }

    if (senha.length < 6) {
      return {
        sucess: false,
        results: {
          message: 'A senha precisa possuir 6 caracteres no mínimo',
        }
      }
    }

    const senha_hash = await bcrypt.hash(senha, 6)

    await sql`insert into usuarios (
      name, 
      email, 
      senha,
      telefone,
      numero_matricula
      ) VALUES (${name}, ${email}, ${senha_hash}, ${telefone}, ${numero_matricula})`

    return {
      sucess: true,
      results: {
        message: 'Usuário criado com sucesso',
      }
    }
  }

  async update(id, usuario) {
    const { name, email, senha, telefone, numero_matricula } = usuario

    // Verifica se o e-mail já está cadastrado
    const emailExistente = await sql`SELECT 1 FROM usuarios WHERE email = ${email} LIMIT 1`;

    if (emailExistente.length >= 1) {
      return {
        sucess: false,
        message: 'Esse e-mail já está sendo usado em outro cadastro',
      }
    }

    await sql`update usuarios set 
    name = ${name}, 
    email = ${email}, 
    senha = ${senha},
    telefone = ${telefone},
    numero_matricula = ${numero_matricula}

    WHERE id = ${id}`
  }

  async delete(id) {
    await sql`delete from usuarios where id = ${id}`
  }
}

export class DatabasePostgresPlantas {
  async create(planta) {
    const { image, effects, curiosities, names_group, name_popular, characteristics, name_scientific } = planta

    if (!image) {
      return {
        sucess: false,
        results: {
          message: 'É obrigatório informar uma imagem',
        }
      }
    }

    if (!effects) {
      return {
        sucess: false,
        results: {
          message: 'É obrigatório informar os efeitos',
        }
      }
    }

    if (!curiosities) {
      return {
        sucess: false,
        results: {
          message: 'É obrigatório informar as curiosidades',
        }
      }
    }

    if (!names_group) {
      return {
        sucess: false,
        results: {
          message: 'É obrigatório informar o nome do grupo',
        }
      }
    }

    if (!name_popular) {
      return {
        sucess: false,
        results: {
          message: 'É obrigatório informar o nome popular',
        }
      }
    }

    if (!characteristics) {
      return {
        sucess: false,
        results: {
          message: 'É obrigatório informar as características',
        }
      }
    }

    if (!name_scientific) {
      return {
        sucess: false,
        results: {
          message: 'É obrigatório informar o nome cientifíco',
        }
      }
    }

    await sql`insert into plantas (
      image,
      effects,
      curiosities,
      names_group,
      name_popular,
      characteristics,
      name_scientific
      ) VALUES (${image}, ${effects}, ${curiosities}, ${names_group}, ${name_popular}, ${characteristics}, ${name_scientific})`

    return {
      sucess: true,
      results: {
        message: 'Planta cadasrada com sucesso',
      }
    }
  }

  async list() {
    let planta
    planta = sql`select * from plantas`

    return planta
  }

  async detalhe(plantaId) {
    let planta

    if (plantaId) {
      planta = await sql`SELECT * FROM plantas WHERE id = ${plantaId}`
      return planta[0] || false;
    } else {
      return false
    }
  }

  async update(id, planta) {
    const { image, effects, curiosities, names_group, name_popular, characteristics, name_scientific } = planta

    await sql`update plantas set 
    image = ${image}, 
    effects = ${effects}, 
    curiosities = ${curiosities},
    names_group = ${names_group},
    name_popular = ${name_popular},
    characteristics = ${characteristics},
    name_scientific = ${name_scientific}
    WHERE id = ${id}`
  }

  async delete(id) {
    await sql`delete from plantas where id = ${id}`
  }
}

export class DatabasePostgresLogin {
  async login(email, senha, reply) {

    // Verifica se o e-mail existe no banco de dados
    const result = await sql`SELECT * FROM usuarios WHERE email = ${email}`

    if (result.length === 0) {
      return 'E-mail não cadastrado'
    }
    const usuario = result[0];

    // // Verifica se a senha está correta
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return 'Senha incorreta'
    }

    // Gera um token de autenticação
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'seu_segredo', {
      expiresIn: '1h', // Tempo de expiração do token (1 hora, por exemplo)
    })

    return {
      sucess: true,
      results: {
        message: 'Sucesso',
        name: usuario.name,
        email: usuario.email,
        telefone: usuario.telefone,
        numero_matricula: usuario.numero_matricula,
        token: token,
      }
    }
  }

}