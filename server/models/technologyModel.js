const pgPool = global.pgPool;

const getAllTechnologies = async () => {
  const { rows } = await pgPool.query('SELECT * FROM technologies ORDER BY id');
  return rows;
};

const getTechnologyById = async (id) => {
  const { rows } = await pgPool.query('SELECT * FROM technologies WHERE id = $1', [id]);
  return rows[0];
};

const createTechnology = async (name, category_id, description) => {
  const { rows } = await pgPool.query(
    'INSERT INTO technologies (name, category_id, description) VALUES ($1, $2, $3) RETURNING *',
    [name, category_id, description]
  );
  return rows[0];
};

const updateTechnology = async (id, name, category_id, description) => {
  const { rows } = await pgPool.query(
    'UPDATE technologies SET name = $1, category_id = $2, description = $3 WHERE id = $4 RETURNING *',
    [name, category_id, description, id]
  );
  return rows[0];
};

const deleteTechnology = async (id) => {
  await pgPool.query('DELETE FROM technologies WHERE id = $1', [id]);
  return true;
};

const getTechnologiesByCategoryId = async (categoryId) => {
  const { rows } = await pgPool.query('SELECT * FROM technologies WHERE category_id = $1 ORDER BY id', [categoryId]);
  return rows;
};

module.exports = {
  getAllTechnologies,
  getTechnologyById,
  createTechnology,
  updateTechnology,
  deleteTechnology,
  getTechnologiesByCategoryId,
};
