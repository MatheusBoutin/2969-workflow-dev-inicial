/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import db from '../db/dbconfig.js';

class Autor {
  constructor({
    id,
    nome,
    nacionalidade,
    created_at,
    updated_at,
  }) {
    this.id = id || null;
    this.nome = nome;
    this.nacionalidade = nacionalidade;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  // Pega todos os autores
  static async pegarAutores() {
    return db.select('*').from('autores');
  }

  // Pega autor pelo ID
  static async pegarPeloId(id) {
    const resultado = await db.select('*').from('autores').where({ id });
    return resultado[0] || null;
  }

  // Cria um novo autor e retorna o objeto criado
  async criar() {
    const novoAutor = {
      nome: this.nome,
      nacionalidade: this.nacionalidade,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };

    const [id] = await db('autores').insert(novoAutor).returning('id');
    return Autor.pegarPeloId(typeof id === 'object' ? id.id : id);
  }

  // Atualiza e retorna o autor atualizado
  async atualizar(id) {
    await db('autores')
      .where({ id })
      .update({
        nome: this.nome,
        nacionalidade: this.nacionalidade,
        updated_at: new Date().toISOString(),
      });

    return Autor.pegarPeloId(id);
  }

  // Deleta um autor pelo ID
  static async excluir(id) {
    return db('autores').where({ id }).del();
  }

  // Se já existir ID -> atualiza, senão cria
  async salvar() {
    if (this.id) {
      return this.atualizar(this.id);
    }
    return this.criar();
  }

  static async pegaLivrosporAutor(autorId) {
    return db('livros').where({ autor_id: autorId });
  }
}

export default Autor;
