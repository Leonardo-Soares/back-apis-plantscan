import { sql } from './db.js'

export class DatabasePostgres {
  async list() {
    let usuario
    usuario = sql`select * from usuarios`

    return usuario
  }

  async detalhe(usuarioId) {
    let usuario

    if (usuarioId) {
      usuario = await sql`SELECT * FROM usuarios WHERE id = ${usuarioId}`
      return usuario[0] || false;
    } else {
      return false
    }
  }

  async create(usuario) {
    const { name, email, senha, telefone, numero_matricula } = usuario

    await sql`insert into usuarios (
      name, 
      email, 
      senha,
      telefone,
      numero_matricula
      ) VALUES (${name}, ${email}, ${senha}, ${telefone}, ${numero_matricula})`
  }

  async update(id, usuario) {
    const { name, email, senha, telefone, numero_matricula } = usuario

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

    await sql`insert into plantas (
      image,
      effects,
      curiosities,
      names_group,
      name_popular,
      characteristics,
      name_scientific
      ) VALUES (${image}, ${effects}, ${curiosities}, ${names_group}, ${name_popular}, ${characteristics}, ${name_scientific})`
  }
}