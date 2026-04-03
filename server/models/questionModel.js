const pgPool = global.pgPool;

const getAllQuestions = async () => {
  const { rows } = await pgPool.query('SELECT * FROM questions ORDER BY id');
  return rows;
};

const getQuestionById = async (id) => {
  const { rows } = await pgPool.query('SELECT * FROM questions WHERE id = $1', [id]);
  return rows[0];
};

const getQuestionsByTechnology = async (technology_id) => {
  const { rows } = await pgPool.query('SELECT * FROM questions WHERE technology_id = $1 ORDER BY id', [technology_id]);
  return rows;
};

const createQuestion = async (technology_id, question, answer) => {
  const { rows } = await pgPool.query(
    'INSERT INTO questions (technology_id, question, answer) VALUES ($1, $2, $3) RETURNING *',
    [technology_id, question, answer]
  );
  return rows[0];
};

const updateQuestion = async (id, question, answer) => {
  const { rows } = await pgPool.query(
    'UPDATE questions SET question = $1, answer = $2 WHERE id = $3 RETURNING *',
    [question, answer, id]
  );
  return rows[0];
};

const deleteQuestion = async (id) => {
  await pgPool.query('DELETE FROM questions WHERE id = $1', [id]);
  return true;
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  getQuestionsByTechnology,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
