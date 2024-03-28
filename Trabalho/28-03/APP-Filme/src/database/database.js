import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('filmes.db');

export const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome_filme TEXT, genero TEXT, classificacao TEXT, data_cad TIMESTAMP DEFAULT CURRENT_TIMESTAMP);'
    );
  });
};

export const inserirFilme = (nome_filme, genero, classificacao, data_cad) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO filmes (nome_filme, genero, classificacao, data_cad) VALUES (?, ?, ?, ?)',
        [nome_filme, genero, classificacao, data_cad],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const buscarFilmes = (filtro) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT *, strftime('%Y-%m-%d %H:%M:%S', data_cad) AS dataInsercao FROM filmes WHERE nome_filme LIKE ? OR genero LIKE ? OR data_cad LIKE ?`,
        [`%${filtro}%`, `%${filtro}%`, `%${filtro}%`],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};


export const editarFilme = (id, nome_filme, genero, classificacao, data_cad) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE filmes SET nome_filme = ?, genero = ?, classificacao = ?, data_cad = ? WHERE id = ?',
        [nome_filme, genero, classificacao, data_cad, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const deletarFilme = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM filmes WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};
