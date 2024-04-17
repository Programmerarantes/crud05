const Pool = require('pg').Pool

const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'matheus123',
    database: 'postgres',
    port: 5432,
})

const getUsers = (require, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error) { 
            throw error 
        }
        response.status(200).json(results.rows)
    })
}

const createUser = (request, response) => {
  const { nome, cpf, rg, data_nasc, sexo } = request.body

pool.query('INSERT INTO users (nome, cpf, rg, data_nasc, sexo) VALUES ($1, $2, $3, $4, $5) RETURNING id', [nome, cpf, rg, data_nasc, sexo], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, cpf, rg, data_nasc, sexo } = request.body

  pool.query(
    'UPDATE users SET nome = $1, cpf = $2, rg = $3, data_nasc = $4, sexo = $5 WHERE id = $6',
    [nome, cpf, rg, data_nasc, sexo, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}