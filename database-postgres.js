import { randomUUID } from 'crypto'
import { sql } from './db.js'

export class DatabasePostgres {
  async list(search) {
    let usuario
    usuario = sql`select * from usuarios`

    // if (search) {
    //   usuario = sql`select * from usuario where title ilike ${'%' + search + '%'}`
    // } else {
    //   usuario = sql`select * from usuario`
    // }

    return usuario
  }

  async create(usuario) {
    const { name, email, senha, numero_matricula, telefone  } = usuario
    
    await sql`insert into usuarios (
      name, 
      email, 
      senha,
      numero_matricula,
      telefone
      ) VALUES (${name}, ${email}, ${senha}, ${numero_matricula}, ${telefone})`
  }

  async update(id, video) {
    const { title, description, duration } = video

    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
  }

  async delete(id) {
    await sql`delete from videos where id = ${id}`
  }
}