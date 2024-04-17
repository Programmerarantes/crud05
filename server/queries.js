const Pool = require('pg').Pool

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'matheus123',
    database: 'postgres',
    port: 5432,
})

const getUsers = (_, res) => {
  const q = "SELECT * FROM users;";

  pool.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.rows);
  });
};

const createUser = (req, res) => {
  const { nome, cpf, data_nasc, rg, sexo } = req.body;
  const q = `INSERT INTO users (nome, cpf, data_nasc, rg, sexo) VALUES ('${nome}', '${cpf}', '${data_nasc}', '${rg}', '${sexo}') RETURNING id`;

  pool.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data.rows);
  });
};

const updateUser = (req, res) => {
  const { nome, cpf, rg, data_nasc, sexo } = req.body
  const q = `UPDATE users SET nome = '${nome}', cpf = '${cpf}', rg = '${rg}', data_nasc = '${data_nasc}', sexo = '${sexo}' WHERE id = ${req.params.id} RETURNING id`
  pool.query(q, (err, data) => {
    if(err) return res.status(500).json(err)

    return res.status(200).json(data.rows)
  } )
}

const deleteUser = (req, res) => {
  const query = `DELETE FROM users WHERE id = ${req.params.id}`;

  pool.query(query, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json({});
  });
};

const countUsers = (_, res) => {
  const query = `SELECT COUNT(*) FROM usuarios;`;

  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);

    const count = data.rows[0].count;
    return res.status(200).json({ count });
  });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    countUsers
}