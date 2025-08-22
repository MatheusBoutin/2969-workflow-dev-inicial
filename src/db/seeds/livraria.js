/* eslint-disable import/prefer-default-export */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Limpa tabelas e reseta IDs
  await knex.raw('TRUNCATE TABLE livros RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE editoras RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE autores RESTART IDENTITY CASCADE');

  // Insere autores
  await knex('autores').insert([
    {
      nome: 'K. Johnson',
      nacionalidade: 'Springfield',
    },
    {
      nome: 'A. Lovelace',
      nacionalidade: 'Paris',
    },
    {
      nome: 'D. Vaughn',
      nacionalidade: 'Orlando',
    },
  ]);

  // Insere editoras
  await knex('editoras').insert([
    {
      nome: 'Editora Node.js',
      cidade: 'São Paulo',
      email: 'node@node.com',
    },
    {
      nome: 'Editora JavaScript',
      cidade: 'Rio de Janeiro',
      email: 'js@js.com',
    },
    {
      nome: 'Editora REST',
      cidade: 'Belo Brasília',
      email: 'ed@ed.com',
    },
  ]);

  // Insere livros
  await knex('livros').insert([
    {
      titulo: 'O Grande Livro de Node.js',
      paginas: 123,
      editora_id: 1,
      autor_id: 1,
    },
    {
      titulo: 'JavaScript Completo',
      paginas: 234,
      editora_id: 2,
      autor_id: 2,
    },
    {
      titulo: 'Tudo Sobre APIs REST',
      paginas: 345,
      editora_id: 3,
      autor_id: 3,
    },
  ]);
}

// npx knex --knexfile=./src/db/knexfile.js seed:run
