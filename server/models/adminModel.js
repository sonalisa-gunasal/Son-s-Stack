const pgPool = global.pgPool;

const getAllAdmins = async () => {
  const { rows } = await pgPool.query('SELECT id, username FROM admins ORDER BY id');
  return rows;
};

const getAdminById = async (id) => {
  const { rows } = await pgPool.query('SELECT id, username FROM admins WHERE id = $1', [id]);
  return rows[0];
};

const getAdminByUsername = async (username) => {
  const { rows } = await pgPool.query('SELECT * FROM admins WHERE username = $1', [username]);
  return rows[0];
};

const createAdmin = async (username, password_hash) => {
  const { rows } = await pgPool.query(
    'INSERT INTO admins (username, password_hash) VALUES ($1, $2) RETURNING id, username',
    [username, password_hash]
  );
  return rows[0];
};

const updateAdmin = async (id, username, password_hash) => {
  const { rows } = await pgPool.query(
    'UPDATE admins SET username = $1, password_hash = $2 WHERE id = $3 RETURNING id, username',
    [username, password_hash, id]
  );
  return rows[0];
};

const deleteAdmin = async (id) => {
  await pgPool.query('DELETE FROM admins WHERE id = $1', [id]);
  return true;
};

module.exports = {
  getAllAdmins,
  getAdminById,
  getAdminByUsername,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
