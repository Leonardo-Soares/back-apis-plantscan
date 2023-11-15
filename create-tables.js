import { sql } from './db.js'

// sql` DROP TABLE IF EXISTS usuarios `.then(() => {
//   console.log('Tabela deletada')
// })

// sql`
//   CREATE TABLE videos (
//     id          TEXT PRIMARY KEY,
//     title       TEXT,
//     description TEXT,
//     duration    INTEGER
//   );
// `.then(() => {
//   console.log('Tabela criada')
// })

// sql`
//   CREATE TABLE usuarios (
//     id                  SERIAL PRIMARY KEY,
//     name                VARCHAR(255),
//     email               VARCHAR(255) UNIQUE,
//     senha               VARCHAR(255),
//     numero_matricula    VARCHAR(20),
//     telefone            VARCHAR(15)
//   );
// `.then(() => {
//   console.log('Tabela usuarios criada')
// })
