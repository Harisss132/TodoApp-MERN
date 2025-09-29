import pool from '../config/db.js';

const getAllTodos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error('Gagal mendapatkan todos', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Todo tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Gagal mendapatkan todos', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO todos (task) VALUES (?)', [task]);
    const newTodo = {
      id: result.insertId,
      task: task,
      status: 'on progress',
    };
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Gagal menambahkan todos', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const [result] = await pool.query('UPDATE todos SET status = ? WHERE id = ?', [status, id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Todos tidak ditemukan' });
    }
    res.json({ message: 'Todo berhasil diperbarui' });
  } catch (error) {
    console.error('Gagal mengupdate todos', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Todo tidak ditemukan' });
    }
    res.json({ message: 'Todo berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus todos', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
