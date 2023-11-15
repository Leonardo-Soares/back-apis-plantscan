import { sql } from './db.js'

// sql` DROP TABLE IF EXISTS plantas `.then(() => {
//   console.log('Tabela deletada')
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

// sql`
//   CREATE TABLE plantas (
//     id                  SERIAL PRIMARY KEY,
//     name_scientific     VARCHAR(255),
//     name_popular        VARCHAR(255),
//     curiosities         VARCHAR(255),
//     effects             VARCHAR(255),
//     characteristics     VARCHAR(255),
//     names_group         VARCHAR(255),
//     image               VARCHAR
//   );
// `.then(() => {
//   console.log('Tabela plantas criada')
// })
