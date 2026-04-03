const pgPool = global.pgPool;

const getAllCategories = async () => {
  const { rows } = await pgPool.query('SELECT * FROM categories ORDER BY id');
  return rows;
};

const getCategoryById = async (id) => {
  const { rows } = await pgPool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return rows[0];
};

const createCategory = async (name, description) => {
  const { rows } = await pgPool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return rows[0];
};

const updateCategory = async (id, name, description) => {
  const { rows } = await pgPool.query(
    'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return rows[0];
};

const deleteCategory = async (id) => {
  await pgPool.query('DELETE FROM categories WHERE id = $1', [id]);
  return true;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
