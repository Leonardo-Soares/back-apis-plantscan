### Projeto de Faculdade

- Node -> 18.16.0

- Banco: Postgres 
  - Utilizei o neon.tech para me ajudar no banco remoto

- Hospedagem: render.com
  - Também serviço gratuito para hospedar sua aplicação Node, integrado com GitHub !

### Comandos úteis

- Instalar pacotes
- npm install

- Criação de tabelas
node crete-tables.js

- Rodar aplicação
npm run dev


Falta testar:
```
const { Pool } = require('pg');
const fs = require('fs');

// Carregue a imagem como um Buffer (substitua 'caminho/para/imagem.jpg' pelo caminho real do arquivo de imagem)
const imagemBuffer = fs.readFileSync('caminho/para/imagem.jpg');

// Configurações do banco de dados
const pool = new Pool({
  user: 'seu_usuario',
  host: 'seu_host',
  database: 'sua_base_de_dados',
  password: 'sua_senha',
  port: 5432, // Porta padrão do PostgreSQL
});

// SQL query para inserir a imagem
const sqlQuery = 'INSERT INTO Tabela (coluna_bytea) VALUES ($1)';

// Executar a query
pool.query(sqlQuery, [imagemBuffer], (err, result) => {
  if (err) {
    console.error('Erro ao inserir imagem:', err.message);
  } else {
    console.log('Imagem inserida com sucesso!');
  }

  // Encerrar a pool de conexões quando terminar
  pool.end();
});
```